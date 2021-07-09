#!/usr/bin/env python
from os import name
from flask import Flask, flash, redirect, render_template, \
     request, url_for
from owlready2 import *

app = Flask(__name__)

ontologia = get_ontology("mall.owl").load()
classes = list(ontologia.classes())
print(classes)
produtos = ontologia.search(is_a=classes[0])
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
    pass


if __name__=='__main__':
    app.run(debug=True)