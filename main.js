import Inventory from './inventory.js';
import Product from './product.js';

class App {
    constructor() {
        this._inventory = new Inventory;
        //Botón "Añadir"//
        let btnAdd = document.querySelector('#btnAdd');
        btnAdd.addEventListener('click', this.addProduct); 
        //Botón "Eliminar"//
        let btnDelete = document.querySelector('#btnDelete');
        btnDelete.addEventListener('click', this.deleteProduct); 
        //Botón "Buscar"//
        let btnSearch = document.querySelector('#btnSearch');
        btnSearch.addEventListener('click', this.searchProduct); 
        //Botón "Listar"//
        let btnList = document.querySelector('#btnList');
        btnList.addEventListener('click', this.listProduct); 
        //Botón "Listar Inverso"//
        let btnReverse = document.querySelector('#btnReverse');
        btnReverse.addEventListener('click', this.reverseList); 
        //Botón "Insertar"//
        let btnInsert = document.querySelector('#btnInsert');
        btnInsert.addEventListener('click', this.insertProduct);    
    }

    // Función para añadir un producto //
    addProduct = () => {         
        let details = document.querySelector('#details');
        let inpCode = document.querySelector('#txtCode');
        let inpName = document.querySelector('#txtName');
        let inpAmount = document.querySelector('#txtAmount');
        let inpCost = document.querySelector('#txtCost');
        let code = inpCode.value;
        let name = inpName.value;
        let amount = Number(inpAmount.value);
        let cost = Number(inpCost.value);
        let product;   

        if(code && name && amount && cost ) {
            inpCode.value = '';
            inpName.value = '';
            inpAmount.value = '';
            inpCost.value = '';
            
            product =  new Product(code, name, amount, cost);
        } else {
          details.innerHTML += 
           '<h4>Ingresa los datos principales.</h4>';
           return;       
        }
        
        this._inventory.add(product);
        details.innerHTML += `<h4>Se agregó el producto ${product.getCode()}.</h4>`;
        console.log(this._inventory)
        console.log(this._inventory._length);
    }

    // Función para eliminar un producto //
    deleteProduct = () => {
        let code = document.querySelector('#txtCode').value;
        let dltProduct = this._inventory.delete(code);
        let details = document.querySelector('#details');

        document.querySelector('#txtCode').value = '';
        
        if(dltProduct) { 
            console.log(dltProduct);
            details.innerHTML += `<h4>Producto ${code} eliminado.</h4>`;
            details.innerHTML += '<div class="card"><h4>Datos del producto:</h4>' + 
            dltProduct.info() + '<div>';
            console.log(this._inventory);             
        } else if(!code) {
            details.innerHTML += '<h4>Ingresa un código de producto.</h4>';
        } else {
            details.innerHTML += '<h4>Este producto no existe.</h4>';
            console.log(dltProduct);
        }

        console.log(this._inventory._length);
    }

    // Función para buscar un producto //
    searchProduct = () => {
        let code = document.querySelector('#txtCode').value;
        let product = this._inventory.search(code);
        let details = document.querySelector('#details');   

        document.querySelector('#txtCode').value = '';

        if(!code) {                     
            details.innerHTML += '<h4>Ingresa un código de producto.</h4>';            
        } else if(product === null) {
            details.innerHTML += `<h4>Se ha buscado el producto ${code}.</h4>`;
            details.innerHTML += '<p>No se encontró el producto.</p>';
            console.log(product);            
        } else {
            console.log(product);
            details.innerHTML += 
            `<h4>Se ha buscado el producto ${code}.</h4>`;
            details.innerHTML += '<div class="card"><h4>Información de producto:</h4>' + 
            product.info() + '<div>';    
        }
        
    }

    // Función para enlistar los productos por orden de entrada //
    listProduct = () => {
        let list = this._inventory.list();
        let details = document.querySelector('#details');

        if(!this._inventory._start) {      
            details.innerHTML += `<h4>${list}</h4>`;   
        } else {
            details.innerHTML += `<h4>Lista predeterminada.</h4>`;
            details.innerHTML +=  '<div class="card"><h4>Productos disponibles:</h4>' + `<p>${list}</p>` + '<div>';                 
        }   
        console.log(list);    
    }

    // Función que invierte la lista de los productos //
    reverseList = () => {
        let reverse = this._inventory.reverseList();
        let details = document.querySelector('#details');

        if(!this._inventory._start) {
            details.innerHTML += `<h4>${reverse}</h4>`;
        } else {
            details.innerHTML += '<h4>Lista Invertida.</h4>';
            details.innerHTML +=  '<div class="card"><h4>Productos disponibles:</h4>' + `<p>${reverse}</p>` + '<div>'; 
        }
    }

    // Función para insertar un producto en una posición determinada //
    insertProduct= () => {       
       let inpCode = document.querySelector('#txtCode');
       let inpName = document.querySelector('#txtName');
       let inpAmount = document.querySelector('#txtAmount');
       let inpCost = document.querySelector('#txtCost');
       let inpInsert = document.querySelector('#txtInsert');       
       let code = inpCode.value;
       let name = inpName.value;
       let amount = Number(inpAmount.value);
       let cost = Number(inpCost.value);
       let insert = Number(inpInsert.value);
       let product;
       let pInsert;

        if(code && name && amount && cost && insert) {
            inpCode.value = '';
            inpName.value = '';
            inpAmount.value = '';
            inpCost.value = '';
            inpInsert.value = '';
                
            product =  new Product(code, name, amount, cost);
            pInsert = this._inventory.insert(product, insert);
        } else {
            details.innerHTML += 
            '<h4>Ingresa todos los datos.</h4>';
            return;
        }
        
        if(pInsert === null) {
            details.innerHTML +=
            '<h4>Esa posición no existe.</h4>';
        } else {
            details.innerHTML +=
            `<h4>Se agregó el producto ${pInsert.getCode()} en la posición ${insert}</h4>.`;
        }
        console.log(this._inventory._length);
    }
}
new App();