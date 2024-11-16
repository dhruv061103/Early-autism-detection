import streamlit as st
import joblib
import pandas as pd

# Load the trained model for children
stacked_model_children = joblib.load('stacked_model_children.joblib')

# Define the feature columns for the child model
feature_columns_children = [
    'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
    'Qchat-10-Score', 'Jaundice', 'Family_mem_with_ASD', 'Age_Years',
    'Sex_m', 'Ethnicity_Latino', 'Ethnicity_Native Indian', 'Ethnicity_Others',
    'Ethnicity_Pacifica', 'Ethnicity_White European', 'Ethnicity_asian',
    'Ethnicity_black', 'Ethnicity_middle eastern', 'Ethnicity_mixed',
    'Ethnicity_south asian', 'Who completed the test_Health care professional',
    'Who completed the test_Others', 'Who completed the test_Self',
    'Who completed the test_family member'
]

# Streamlit app
st.title("Autism Prediction App for Children")

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
age_months = st.number_input("Age (in months)", min_value=0, max_value=120)
Sex = st.selectbox("Sex", ['m', 'f'])
Ethnicity = st.selectbox("Ethnicity", [
    'White European', 'Black', 'Hispanic', 'Latino', 'Native Indian', 
    'Others', 'Pacifica', 'Asian', 'Middle Eastern', 'Mixed', 'South Asian'
])
Jaundice = st.radio("Has your child had jaundice?", ['Yes', 'No'])
family_mem_with_ASD = st.radio("Does your family have a member with ASD?", ['Yes', 'No'])
who_completed_test = st.selectbox("Who completed the test?", [
    'Health care professional', 'Self', 'Family member', 'Others'
])

# Convert Yes/No to 1/0
def yes_no_to_int(value):
    return 1 if value == 'Yes' else 0

# Calculate Qchat-10 score by summing converted values
Qchat_score = sum(yes_no_to_int(Q) for Q in [Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10])

# Organize input into a DataFrame
new_input_children = {
    'A1': yes_no_to_int(Q1), 'A2': yes_no_to_int(Q2), 'A3': yes_no_to_int(Q3),
    'A4': yes_no_to_int(Q4), 'A5': yes_no_to_int(Q5), 'A6': yes_no_to_int(Q6),
    'A7': yes_no_to_int(Q7), 'A8': yes_no_to_int(Q8), 'A9': yes_no_to_int(Q9),
    'A10': yes_no_to_int(Q10), 'Qchat-10-Score': Qchat_score, 
    'Age_Mons': age_months, 'Sex': Sex, 'Ethnicity': Ethnicity,
    'Jaundice': Jaundice, 'Family_mem_with_ASD': family_mem_with_ASD,
    'Who completed the test': who_completed_test
}

# Preprocess the input (convert original input to one-hot encoded format)
input_df_children = pd.DataFrame([new_input_children])
input_df_encoded_children = pd.get_dummies(input_df_children, columns=[
    'Sex', 'Ethnicity', 'Jaundice', 'Family_mem_with_ASD', 'Who completed the test'
])

# Convert 'Age_Mons' to 'Age_Years'
input_df_encoded_children['Age_Years'] = input_df_encoded_children['Age_Mons'] / 12

# Fill in any missing columns (created during one-hot encoding)
missing_cols_children = set(feature_columns_children) - set(input_df_encoded_children.columns)
for col in missing_cols_children:
    input_df_encoded_children[col] = 0

# Ensure the input data has the same column order as the training data
input_df_encoded_children = input_df_encoded_children[feature_columns_children]

# Make prediction
prediction_children = stacked_model_children.predict(input_df_encoded_children)

# Display prediction result
if prediction_children[0] == 1:
    st.write("The child is predicted to be autistic.")
else:
    st.write("The child is predicted to be not autistic.")
