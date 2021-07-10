#!/usr/bin/env python
from owlready2 import *

ontologia = get_ontology("mall_copy.owl").load()
ontologia.save("teste.owl")