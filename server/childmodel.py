import joblib
import numpy as np
import pandas as pd

# Load the trained model
stacked_model = joblib.load('stacked_model_children.joblib')

# Define the feature columns as per the trained model
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

# Define input data based on frontend input
new_input_children = {
    'A1': 1, 'A2': 1, 'A3': 1, 'A4': 1, 'A5': 1,
    'A6': 1, 'A7': 1, 'A8': 1, 'A9': 1, 'A10': 1,
    'Age_Mons': 12,  # Original age in months
    'Qchat-10-Score': 10, 
    'Sex': 'o',  # Assuming 'o' might represent 'other'
    'Ethnicity': 'Asian', 
    'Jaundice': 'no', 
    'Family_mem_with_ASD': 'no',
    'Who completed the test': 'Parent'
}

# Convert input data into a DataFrame
input_df_children = pd.DataFrame([new_input_children])

# One-hot encode categorical columns
input_df_encoded_children = pd.get_dummies(input_df_children, columns=['Sex', 'Ethnicity', 'Jaundice', 'Family_mem_with_ASD', 'Who completed the test'])

# Convert Age_Mons to Age_Years
input_df_encoded_children['Age_Years'] = input_df_encoded_children['Age_Mons'] / 12
input_df_encoded_children.drop('Age_Mons', axis=1, inplace=True)  # Drop the original Age_Mons column

# Ensure all required feature columns are present
missing_cols_children = set(feature_columns_children) - set(input_df_encoded_children.columns)
for col in missing_cols_children:
    input_df_encoded_children[col] = 0

# Reorder columns to match the model's expected input
input_df_encoded_children = input_df_encoded_children[feature_columns_children]

# Use the trained model to make predictions
prediction_children = stacked_model.predict(input_df_encoded_children)

# Output the prediction result
if prediction_children[0] == 1:
    print("The child is predicted to be autistic.")
else:
    print("The child is predicted to be not autistic.")
