import streamlit as st
import joblib
import pandas as pd

# Load the trained model
stacked_model = joblib.load('stacked_model.joblib')

# Define the feature columns
feature_columns = [
    'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'age', 'result',
    'Sex_m', 'Ethnicity_Black', 'Ethnicity_Hispanic', 'Ethnicity_Latino',
    'Ethnicity_Middle Eastern', 'Ethnicity_Others', 'Ethnicity_Pasifika',
    'Ethnicity_South Asian', 'Ethnicity_Turkish', 'Ethnicity_White-European',
    'Jaundice_yes', 'austim_yes', 'contry_of_res_AmericanSamoa',
    'contry_of_res_Angola', 'contry_of_res_Armenia', 'contry_of_res_Aruba',
    'contry_of_res_Australia', 'contry_of_res_Austria', 'contry_of_res_Bahamas',
    'contry_of_res_Bangladesh', 'contry_of_res_Belgium', 'contry_of_res_Bolivia',
    'contry_of_res_Brazil', 'contry_of_res_Burundi', 'contry_of_res_Canada',
    'contry_of_res_Chile', 'contry_of_res_China', 'contry_of_res_Costa Rica',
    'contry_of_res_Cyprus', 'contry_of_res_Czech Republic', 'contry_of_res_Ecuador',
    'contry_of_res_Egypt', 'contry_of_res_Ethiopia', 'contry_of_res_Finland',
    'contry_of_res_France', 'contry_of_res_Germany', 'contry_of_res_Iceland',
    'contry_of_res_India', 'contry_of_res_Indonesia', 'contry_of_res_Iran',
    'contry_of_res_Ireland', 'contry_of_res_Italy', 'contry_of_res_Jordan',
    'contry_of_res_Malaysia', 'contry_of_res_Mexico', 'contry_of_res_Nepal',
    'contry_of_res_Netherlands', 'contry_of_res_New Zealand', 'contry_of_res_Nicaragua',
    'contry_of_res_Niger', 'contry_of_res_Oman', 'contry_of_res_Pakistan',
    'contry_of_res_Philippines', 'contry_of_res_Portugal', 'contry_of_res_Romania',
    'contry_of_res_Russia', 'contry_of_res_Saudi Arabia', 'contry_of_res_Serbia',
    'contry_of_res_Sierra Leone', 'contry_of_res_South Africa', 'contry_of_res_Spain',
    'contry_of_res_Sri Lanka', 'contry_of_res_Sweden', 'contry_of_res_Tonga',
    'contry_of_res_Turkey', 'contry_of_res_Ukraine', 'contry_of_res_United Arab Emirates',
    'contry_of_res_United Kingdom', 'contry_of_res_United States', 'contry_of_res_Uruguay',
    'contry_of_res_Viet Nam', 'used_app_before_yes', 'relation_Others',
    'relation_Parent', 'relation_Relative', 'relation_Self'
]

# Streamlit app
st.title("Autism Prediction App")

# Collect user inputs using relevant questions with radio buttons
Q1 = st.radio("Does your child often seem to be in their own world?", ['Yes', 'No'])
Q2 = st.radio("Does your child have trouble making eye contact?", ['Yes', 'No'])
Q3 = st.radio("Does your child often repeat phrases or actions?", ['Yes', 'No'])
Q4 = st.radio("Does your child show little interest in social activities?", ['Yes', 'No'])
Q5 = st.radio("Does your child have strong reactions to sensory experiences?", ['Yes', 'No'])
Q6 = st.radio("Does your child prefer to play alone?", ['Yes', 'No'])
Q7 = st.radio("Does your child have trouble understanding social cues?", ['Yes', 'No'])
Q8 = st.radio("Does your child exhibit unusual behaviors?", ['Yes', 'No'])
Q9 = st.radio("Does your child have a rigid routine or rituals?", ['Yes', 'No'])
Q10 = st.radio("Does your child have intense interests in specific topics?", ['Yes', 'No'])
age = st.number_input("Age", min_value=0, max_value=100)
Sex = st.selectbox("Sex", ['m', 'f'])
Ethnicity = st.selectbox("Ethnicity", [
    'White-European', 'Black', 'Hispanic', 'Latino', 'Middle Eastern', 'Others', 
    'Pasifika', 'South Asian', 'Turkish', 'White-European'])
Jaundice = st.radio("Jaundice", ['Yes', 'No'])
austim = st.radio("Has your child been diagnosed with autism?", ['Yes', 'No'])
contry_of_res = st.selectbox("Country of Residence", [
    'Canada', 'United States', 'India', 'Australia', 'Other'])
used_app_before = st.radio("Used App Before?", ['Yes', 'No'])
relation = st.selectbox("Relation", ['Parent', 'Self', 'Relative', 'Others'])

# Convert Yes/No to 1/0
def yes_no_to_int(value):
    return 1 if value == 'Yes' else 0

# Calculate result by summing converted values
result = sum(yes_no_to_int(Q) for Q in [Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10])

# Organize input into a dataframe
new_input = {
    'A1': yes_no_to_int(Q1), 'A2': yes_no_to_int(Q2), 'A3': yes_no_to_int(Q3),
    'A4': yes_no_to_int(Q4), 'A5': yes_no_to_int(Q5), 'A6': yes_no_to_int(Q6),
    'A7': yes_no_to_int(Q7), 'A8': yes_no_to_int(Q8), 'A9': yes_no_to_int(Q9),
    'A10': yes_no_to_int(Q10), 'age': age, 'Sex': Sex, 'Ethnicity': Ethnicity, 
    'Jaundice': Jaundice, 'austim': austim, 'contry_of_res': contry_of_res, 
    'used_app_before': used_app_before, 'result': result, 'relation': relation
}

# Preprocess the input (convert original input to one-hot encoded format)
input_df = pd.DataFrame([new_input])
input_df_encoded = pd.get_dummies(input_df, columns=[
    'Sex', 'Ethnicity', 'Jaundice', 'austim', 'contry_of_res', 'used_app_before', 'relation'])

# Add missing columns if necessary
missing_cols = set(feature_columns) - set(input_df_encoded.columns)
for col in missing_cols:
    input_df_encoded[col] = 0

# Ensure the input data has the same column order as the training data
input_df_encoded = input_df_encoded[feature_columns]

# Make prediction
prediction = stacked_model.predict(input_df_encoded)

# Display prediction result
if prediction[0] == 1:
    st.write("The person is predicted to be autistic.")
else:
    st.write("The person is predicted to be not autistic.")