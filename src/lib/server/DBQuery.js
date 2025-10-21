export class DBQueryClass {
    constructor(pool) {
        this.pool = pool;
        this.query = '';

        this.tableName = null;
        this.colNames = [];
        this.wheres = [];

        this.flagIgnore = '';

        this.sets = {};
        this.clauses = [];
        this.bindings = [];

        this.debug = false;

        return new Proxy(this, {
            get(target, prop, receiver) {
                if (prop in target) {
                    const value = Reflect.get(target, prop, receiver);
                    return typeof value === 'function' ? value.bind(receiver) : value;
                }
                return (...args) => target.__call(receiver, prop, args[0], args[1]);
            }
        });
    }

    // инициаторы
    select(tableName) {
        this.cleanFields();
        this.queryType = 'SELECT';
        this.tableName = tableName;
        return this;
    }

    insert(tableName) {
        this.cleanFields();
        this.queryType = 'INSERT';
        this.tableName = tableName;
        return this;
    }

    // сеттеры
    colAll() {
        this.colNames = ['*'];
        return this;
    }


    __call(receiver, methodName, data, operator) {
        if (methodName.startsWith('where_')) {
            const colName = methodName.slice(6);
            this.#where(colName, data, operator);
            return receiver;
        }
        if (methodName.startsWith('col_')) {
            const colName = methodName.slice(4);
            this.#col(colName, data);
            return receiver;
        }
        if (methodName.startsWith('set_')) {
            const colName = methodName.slice(4);
            this.#set(colName, data);
            return receiver;
        }
    }

    // финализирующие
    async execute() {
        let resultExecute;
        if (this.queryType == 'INSERT') {
            resultExecute = await this.getInsertQuery();
        }

        const { insertId } = resultExecute[0];
        return { insertId };
    }

    getAll() {
        return this.getSelectQuery();
    }

    async getIndexedRows(colName = 'id') {
        const items = await this.getSelectQuery();
        const result = Object.fromEntries(items.map(item => [item[colName], item]));
        return result;
    }

    async getOne() {
        const result = await this.getSelectQuery();
        return result.length > 0 ? result[0] : {};
    }

    debug(isShow) {
        this.isDebug = isShow;
    }

    #set(column, data) {
        this.sets[column] = data;
        return this;
    }

    #col(column, alias) {
        const item = alias ? `\`${this.tableName}\`.\`${column}\` AS \`${alias}\`` : `\`${this.tableName}\`.\`${column}\``;
        this.colNames = [...this.colNames, item]
        return this;
    }

    #where(column, value, operator) {
        this.wheres = [...this.wheres, { column, value, operator, tableName: this.tableName }]
        return this;
    }

    appendWheres() {
        const prefix = 'WHERE';

        this.wheres.forEach(whereItem => {
            const operator = whereItem.operator || '=';
            const typeValue = typeof whereItem.value;

            if (typeValue == 'object') {
                const placeholders = whereItem.value.map(item => '?').join(', ');
                this.clauses = [...this.clauses, `\`${whereItem.tableName}\`.\`${whereItem.column}\` IN (${placeholders})`];
                this.bindings = [...this.bindings, ...Object.values(whereItem.value)];
            } else {
                this.clauses = [...this.clauses, `\`${whereItem.tableName}\`.\`${whereItem.column}\` ${operator} ?`];
                this.bindings = [...this.bindings, whereItem.value];
            }
        })

        if (this.clauses.length) {
            const clausesString = this.clauses.join(' AND ');
            this.query = `${this.query} ${prefix} ${clausesString}`;
        }
    }

    async getInsertQuery() {
        this.query = `${this.queryType} ${this.flagIgnore} INTO ${this.tableName}`;

        const colNames = Object.keys(this.sets).join(', ');
        this.bindings = Object.values(this.sets);
        const colValues = this.bindings.map(item => '?').join(', ');

        this.query += ` (${colNames}) VALUES (${colValues})`;

        // if (this.isDebug) {
        // console.log(this);
        // }

        const result = await this.pool.execute(this.query, this.bindings);
        return result;
    }
    async getSelectQuery() {
        const colNames = this.colNames.join(', ');

        this.query = `${this.queryType} ${colNames} FROM \`${this.tableName}\``;
        this.appendWheres();

        // if (this.isDebug) {
        // console.log(this);
        // }

        const [rows] = await this.pool.execute(this.query, this.bindings);
        return rows;
    }

    cleanFields() {
        this.query = '';
        this.flagIgnore = '';

        this.tableName = null;
        this.colNames = [];
        this.wheres = [];

        this.sets = {};
        this.clauses = [];
        this.bindings = [];

        this.debug = false;

    };
}
