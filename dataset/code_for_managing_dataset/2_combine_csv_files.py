import pandas as pd

# Define file paths
file1_path = "seprate_file/Aansu.csv"
file2_path = "seprate_file/Vansh_final_labelled.csv"
file3_path = "seprate_file/twisha.csv"

# Output file path
output_path = "combined_dataset.csv"

# Read CSV files into DataFrames
df1 = pd.read_csv(file1_path)
df2 = pd.read_csv(file2_path)
df3 = pd.read_csv(file3_path)

# Combine DataFrames
combined_df = pd.concat([df1, df2, df3], ignore_index=True)

# Save combined DataFrame to CSV
combined_df.to_csv(output_path, index=False)

print(f"Successfully combined CSV files into '{output_path}'")