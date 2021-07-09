from os import name
from flask import Flask, flash, redirect, render_template, \
     request, url_for
from owlready2 import *
import uuid

app = Flask(__name__)

ontologia = get_ontology("mall.owl").load()
classes = list(ontologia.classes())
print(classes)
ontologia.save()
print(classes)


if __name__=='__main__':
    app.run(debug=True)

