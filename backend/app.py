#!/usr/bin/env python
from os import name
from flask import Flask, flash, redirect, render_template, \
     request, url_for,jsonify
from owlready2 import *
import uuid

app = Flask(__name__)

class ProdutoDTO:
    def __init__(self, name, id=None,):
        self.name, self.id = name, id

ontologia = get_ontology("mall.owl").load()
classes = list(ontologia.classes())
Purchase = classes[5]
Customer = classes[1]
# print(classes)
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
    
@app.route("/produtos" , methods=['GET'])
#todo
def listing():
    global produtos
    global lojasFiltradas
    global filtroSelecionado
    listaDeprodutos=[]

    for produto in produtos:
        produto.productId = str(uuid.uuid4())
        listaDeprodutos.append(ProdutoDTO(
            produto._name,
            id=produto.productId,
        ).__dict__)

    return (jsonify(listaDeprodutos))

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
        # print(produto.__dict__)
        if produto.productId==product["id"]:
            productToSave = produto
    
    for customer in customers:
        if customer.customerId==customerFromRequest["id"]:
                customerToSave = customer
                # print(customer.customerId)
                # print(customer.customerName)
                # print(customer.purchases)


    print(customerToSave)
    print(productToSave)

    purchase = Purchase()
    purchase.customer = customerToSave
    purchase.product = productToSave
    customerToSave.purchases = [purchase]

    # print(customerToSave.get_object_properties())

    ontologia.save("mall.owl")

    return ('', 200)

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

@app.route("/teste" , methods=['GET'])
def teste(): 
    global customers
    global compras
    
    for customer in customers:
        print(list(customer.purchases))

    print("\n\n\n\n\n")

    for compra in compras:
        print(compra)
    
    return ("", 200)

if __name__=='__main__':
    app.run(debug=True)