#!/usr/bin/env python
from os import name
from flask import Flask, flash, redirect, render_template, \
     request, url_for
from owlready2 import *
import uuid

app = Flask(__name__)

ontologia = get_ontology("mall.owl").load()
classes = list(ontologia.classes())
# print(classes)
produtos = ontologia.search(type=classes[0])
lojas = ontologia.search(type=classes[1])
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
    global lojasFiltradas
    global filtroSelecionado
    lojas = ontologia.search(type=classes[0])


    print(lojas)
    storeList=[]
    for loja in lojas:
        storeList.append(loja._name)
    return (str(storeList))

    
@app.route("/rota" , methods=['POST'])
def rota():
    pass
@app.route("/compra" , methods=['POST'])
def compra():
    data = request.json 

    ontologia2 = get_ontology("mall_with_customers.owl").load()

    classes2 = list(ontologia2.classes())
    customers = ontologia.search(type=classes[3])
    customerFromRequest = data["customer"]

    print(customerFromRequest)
    
    for customer in customers:
        if customer.customerId==customerFromRequest["id"]:
                print(customer.customerId)
                print(customer.customerName)



    return ('', 200)


@app.route("/cadastro" , methods=['POST'])
def cadastrar():
    global classes
    global ontologia
    Customer = classes[3]
    data = request.json 
    

    new_id = str(uuid.uuid4())

    Customer(new_id,customerName = data["name"], customerId = new_id)
    ontologia.save("mall_with_customers.owl")

    return (new_id, 200)


if __name__=='__main__':
    app.run(debug=True)