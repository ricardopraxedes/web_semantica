import http.server
import socketserver
from urllib.parse import urlparse
from urllib.parse import parse_qs
import rdflib
from rdflib import Namespace
from rdflib.namespace import RDFS,RDF
from owlready2 import *

def getHtml():
    ontologia = get_ontology("mall.owl").load()
    namespace = ontologia.get_namespace("http://www.owl-ontologies.com/mall.owl#")
    # lista = list(onto.individuals())
    html  = "<p>Lojas:</p>"
    classes = list(ontologia.classes())
    alimentacao = ontologia.search(type=classes[7])
    calcados = ontologia.search(type=classes[8])
    eletronicos = ontologia.search(type=classes[9])
    print(alimentacao)
    print(calcados)
    print(eletronicos)


getHtml()