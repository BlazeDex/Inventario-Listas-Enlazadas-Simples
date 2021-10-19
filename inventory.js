export default class Inventory {
    constructor() {
        this._start = null;
        this._length = 0;
    }

    add(product){ 
        if(this._start === null) {
            this._start = product;
        } else {
            let aux = this._start;
            while(aux._next !== null) {
                aux = aux._next;
            }
            aux._next = product;
        }
        this._length++;
    }

    delete(code) {
        let dlt = null;
        
        if(!this._start) {
            return null;
        }

        if(this._start.getCode() === code) {
            dlt = this._start;
            this._start = this._start._next;
            this._length--;
            return dlt;
        } else {
            let prev = this._start;
            let current = this._start._next;
            while(current !== null) {
                if(current.getCode() === code) {
                    prev._next = current._next;
                    dlt = current;
                    dlt._next = null;
                    this._length--;   
                    return dlt;
                } else {
                    prev = current;
                    current = current._next;      
                }                
            }     
            return null;
        }
    }

    search(code) {
        if(!this._start) {
            return null;
        }

        let aux = this._start;
        while(aux !== null) {
            if(aux.getCode() === code) {
                return aux;  
            }
            aux = aux._next;
        }
        return null;
    }

    list() {
        let list = '';
        let product = this._start;

        if(!product) {
            list = 'No hay ningún producto registrado.'
            return list;
        } else {
            while(product !== null) {
                list += product.info() + '\n' + '---------------------------------------';
                product = product._next;
            }
            return list;
        }
    }

    reverseList() {
        let list = '';
        let product = this._start;

        if(!product) {
            list = 'No hay ningún producto registrado.'
            return list;
        } else {
            while(product !== null) {
                list = product.info() + '\n' + '---------------------------------------' + list;
                product = product._next;
            }
            return list;
        }   
    }

    insert(product, pos) { 
        let start = this._start;
        let prev = null; 
        if(pos <= 0 || pos > this._length + 1) {
            return null;
        } else if(pos === 1) {
            product._next = start;
            this._start = product;
            this._length++;   
            return product;
        } else {
            for(let i = 1; i < pos; i++) {
                prev = start;
                start = start._next;
            }
            product._next = start;
            prev._next = product;
            this._length++;   
            return product;
        }   
    }
}