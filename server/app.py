import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained models for adults and children
stacked_model_adult = joblib.load('stacked_model.joblib')
stacked_model_child = joblib.load('stacked_model_children.joblib')

# Define the feature columns for adult and child models
feature_columns_adult = [
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

feature_columns_child = [
    'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
    'Qchat-10-Score', 'Jaundice', 'Family_mem_with_ASD', 'Age_Years',
    'Sex_m', 'Ethnicity_Latino', 'Ethnicity_Native Indian', 'Ethnicity_Others',
    'Ethnicity_Pacifica', 'Ethnicity_White European', 'Ethnicity_asian',
    'Ethnicity_black', 'Ethnicity_middle eastern', 'Ethnicity_mixed',
    'Ethnicity_south asian', 'Who completed the test_Health care professional',
    'Who completed the test_Others', 'Who completed the test_Self',
    'Who completed the test_family member'
]

@app.route('/predict/adult', methods=['POST'])
def predict_adult():
    # Retrieve and parse the input JSON data
    input_data = request.json.get('inputData')  # Access the nested 'inputData' dictionary
    
    # Convert the input data to a DataFrame
    input_df = pd.DataFrame([input_data])
    
    # Debugging statements
    print("Input data:", input_data)
    print("Input DataFrame:", input_df)
    
    # Convert 'age' column to integer type
    if 'age' in input_df.columns:
        input_df['age'] = input_df['age'].astype(int)

    # Define the categorical columns expected in the input
    categorical_columns_adult = ['Sex', 'Ethnicity', 'Jaundice', 'austim', 'contry_of_res', 'used_app_before', 'relation']
    
    # Filter out only the columns that exist in `input_df` before one-hot encoding
    existing_columns_adult = [col for col in categorical_columns_adult if col in input_df.columns]
    input_df_encoded_adult = pd.get_dummies(input_df, columns=existing_columns_adult)
    
    # Fill in any missing columns after encoding to match model's feature columns
    missing_cols_adult = set(feature_columns_adult) - set(input_df_encoded_adult.columns)
    for col in missing_cols_adult:
        input_df_encoded_adult[col] = 0

    # Ensure input columns match the order and structure expected by the model
    input_df_encoded_adult = input_df_encoded_adult[feature_columns_adult]

    # Predict using the loaded adult model
    prediction = stacked_model_adult.predict(input_df_encoded_adult)
    message = 'The person is predicted to be autistic.' if prediction == 1 else 'The person is predicted to be not autistic.'
    
    # Return the prediction result
    return jsonify({'prediction': int(prediction[0]), 'message': message})


@app.route('/predict/child', methods=['POST'])
def predict_child():
    # Retrieve and parse the input JSON data
    input_data_initial = request.json.get('inputData')

    input_data = {
    'A1': input_data_initial['A1'], 'A2': input_data_initial['A2'], 'A3': input_data_initial['A3'], 'A4': input_data_initial['A4'], 'A5': input_data_initial['A5'],
    'A6': input_data_initial['A6'], 'A7': input_data_initial['A7'], 'A8': input_data_initial['A8'], 'A9': input_data_initial['A9'], 'A10': input_data_initial['A10'],
    'Age_Mons': input_data_initial['Age_Mons'],  # Original age in months
    'Qchat-10-Score': input_data_initial['Qchat_10_Score'], 
    'Sex': input_data_initial['Sex'],  # Assuming 'o' might represent 'other'
    'Ethnicity': input_data_initial['Ethnicity'], 
    'Jaundice': input_data_initial['Jaundice'], 
    'Family_mem_with_ASD': input_data_initial['Family_mem_with_ASD'],
    'Who completed the test': input_data_initial['Who completed the test']
}

    print("input data: ",input_data)

    if not input_data:
        return jsonify({'error': 'No input data provided.'}), 400

    # Convert input data to a DataFrame
    input_df = pd.DataFrame([input_data])

    print(input_df)

    # One-hot encoding for categorical columns
    categorical_columns_child = [
        'Sex', 'Ethnicity', 'Jaundice', 'Family_mem_with_ASD', 'Who completed the test'
    ]
    existing_columns_child = [col for col in categorical_columns_child if col in input_df.columns]
    input_df_encoded_child = pd.get_dummies(input_df, columns=existing_columns_child)

    # Convert 'Age_Mons' to 'Age_Years'
    if 'Age_Mons' in input_df.columns:
        input_df['Age_Mons'] = int(input_df['Age_Mons'].iloc[0])  # Ensure Age_Mons is integer
        input_df_encoded_child['Age_Years'] = input_df['Age_Mons'] / 12

    # Add missing columns for consistency with the model
    missing_cols_child = set(feature_columns_child) - set(input_df_encoded_child.columns)
    for col in missing_cols_child:
        input_df_encoded_child[col] = 0

    # Ensure columns are ordered correctly
    input_df_encoded_child = input_df_encoded_child[feature_columns_child]

    # Predict using the child model
    prediction = stacked_model_child.predict(input_df_encoded_child)
    message = 'The child is predicted to be autistic.' if prediction[0] == 1 else 'The child is predicted to be not autistic.'

    # Return prediction result
    return jsonify({'prediction': int(prediction[0]), 'message': message})



if __name__ == '__main__':
    app.run(debug=True)
