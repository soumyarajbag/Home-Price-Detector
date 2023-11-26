import streamlit as st
from PIL import Image
import json
import pickle
import numpy as np 

json_data = open("location.json")
data= json.load(json_data)["data_columns"]
location = data[3:]

def model_predict(area, bhk, bath, location_input):
    demo = pickle.load(open('model.pickle', 'rb'))
    loc_index = data.index(location_input.title())
    x = np.zeros(len(data))
    x[0] = area
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1
    return round(demo.predict([x])[0],2)

st.set_page_config(page_title="Home Price Prediction App")

hide_default_format = """
       <style>
       #MainMenu {visibility: hidden; }
       footer {visibility: hidden;}
       </style>
       """
st.markdown(hide_default_format, unsafe_allow_html=True)
st.title('Price Prediction App')
st.write("Welcome to the Price Prediction App!")


left, right = st.columns(2)
with left:     
           area = st.text_input("Area (sq. feet)")
           bhk = st.selectbox("BHK", [1, 2, 3, 4, 5])
with right:
           bath = st.selectbox("Bathrooms", [1, 2, 3, 4, 5] )
           location_input = st.selectbox("Location" , location)

col1 , col2 , col3 , col4 , col5 = st.columns(5)
with col1:     
           pass
with col2:
          pass
with col3:
             submit_button = st.button("Predict Price")
with col4:
          pass
with col5:
          pass



process = False

if submit_button:
            result = model_predict(area, bhk, bath, location_input)
            process = True



if process==True:
                 st.success('Price Detected! Price : {}'.format(result), icon="✅")
else:
     st.warning('Waiting for input...', icon="⏳")