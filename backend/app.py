#!/usr/bin/env python
from os import name
from flask import Flask, flash, redirect, render_template, \
     request, url_for,jsonify
from owlready2 import *
import uuid
from datetime import date
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class ProdutoDTO:
    def __init__(self, name, id=None,price=None):
        self.name, self.id, self.price = name, id, price

class CompraDTO:
    def __init__(self,  id=None,date=None, produto=None):
        self.id, self.date, self.produto = id, date, produto

ontologia = get_ontology("mall.owl").load()
classes = list(ontologia.classes())
Purchase = classes[5]
Customer = classes[1]
customers = ontologia.search(type=classes[1])
lojas = ontologia.search(type=classes[3])
produtos = ontologia.search(type=classes[4])
compras = ontologia.search(type=classes[5])
alimentacao = ontologia.search(type=classes[7])
calcados = ontologia.search(type=classes[8])
eletronicos = ontologia.search(type=classes[9])
filtros=['Todas as lojas','Ordem Alfabetica','Alimentação', 'Calçados','Eletrônicos']
filtroSelecionado = ""
lojasFiltradas = lojas

print("compras")
print(len(list(compras)))
print("customers")
print(len(list(customers)))

@cross_origin()
@app.route("/filtrar" , methods=['POST'])
def filtrar():
    
    global lojasFiltradas
    global filtroSelecionado
    filtroSelecionado  = request.json['filter']
 
    if filtroSelecionado == filtros[0]:
        lojasFiltradas = lojas
    if filtroSelecionado == filtros[1]:
       lojasFiltradas = lojas
       lojasFiltradas.sort(key=lambda x: x._name) 
    if filtroSelecionado == filtros[2]:
        lojasFiltradas = alimentacao

    if filtroSelecionado == filtros[3]:
        lojasFiltradas = calcados

    if filtroSelecionado == filtros[4]:
        lojasFiltradas = eletronicos
    storeList=[]
    for loja in lojasFiltradas:
        storeList.append(loja._name)    
    return (str(storeList))
@cross_origin()    
@app.route("/produtos" , methods=['GET'])
def listing():
    global produtos
    global lojasFiltradas
    global filtroSelecionado
    listaDeprodutos=[]

    for produto in produtos:
        listaDeprodutos.append(ProdutoDTO(
            produto._name,
            id=produto.productId,
            price=produto.productPrice
        ).__dict__)

    return (jsonify(listaDeprodutos))
@cross_origin()
@app.route("/compra" , methods=['POST'])
def compra():
    global Purchase
    global produtos
    global customers
    data = request.json 
    purchaseFromRequest = data["purchase"]
    customerFromRequest = purchaseFromRequest["customer"]
    product = purchaseFromRequest["product"]

    for produto in produtos:
        if produto.productId==product["id"]:
            productToSave = produto
    
    for customer in customers:
        if customer.customerId==customerFromRequest["id"]:
                customerToSave = customer

    purchase = Purchase()
    purchase.purchaseId = str(uuid.uuid4())
    dataDaCompra = date.today()
    dataDaCompra = dataDaCompra.strftime('%d/%m/%Y')
    purchase.date = dataDaCompra
    purchase.customer = customerToSave
    purchase.product = productToSave
    customerToSave.purchases.append(purchase)

    ontologia.save("mall.owl")

    return ('', 200)
@cross_origin()
@app.route("/cadastro" , methods=['POST'])
def cadastrar():
    global classes
    global ontologia
    global Customer
    data = request.json 
    
    new_id = str(uuid.uuid4())

    Customer(new_id,customerName = data["name"], customerId = new_id)
   
    ontologia.save("mall.owl")

    return (new_id, 200)
@cross_origin()
@app.route("/minhas-compras/<id>" , methods=['GET'])
def teste(id): 
    global customers
    global compras
    listaDeCompras = []

    for customer in customers:
        if customer.customerId==id:
            for purchase in customer.purchases:
                
                nomeProduto=purchase.product._name
                idProduto=purchase.product.productId
                precoProduto=purchase.product.productPrice
                
                listaDeCompras.append(CompraDTO(
                    id=purchase.purchaseId,
                    date=purchase.date,
                    produto=ProdutoDTO(            
                        nomeProduto,
                        id=idProduto,
                        price=precoProduto).__dict__,
                 ).__dict__)
            
            return (jsonify(listaDeCompras), 200)

    return (str("Cliente não encontrado."), 400)

if __name__=='__main__':
    app.run(debug=True)