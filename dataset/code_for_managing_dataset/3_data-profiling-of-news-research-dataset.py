import pandas as pd
from pandas_profiling import ProfileReport
import matplotlib.pyplot as plt
import seaborn as sns

# Replace "your_file.csv" with your actual file path
df = pd.read_csv("combined_dataset.csv")

# Generate the profiling report
profile = ProfileReport(df)

# Save the report as an HTML file (default)
profile.to_file(output_file="your_report.html")

# Define the data
ministry_idx = [60, 34, 23, 18, 6, 41, 20, 44, 54, 12, -1]
percentage = [39.1, 13.5, 6.1, 5.6, 5.3, 4.2, 2.1, 1.9, 1.8, 1.6, 18.8]

# Create a color palette with different colors
colors = sns.color_palette("hls", len(ministry_idx))

# Create the pie chart
plt.figure(figsize=(10, 10))
plt.pie(percentage, labels=ministry_idx, autopct="%1.1f%%", startangle=90, colors=colors)
plt.axis("equal")  # Equal aspect ratio ensures a circular pie chart

# Add a title and labels
# plt.title("Percentage of News by Ministry Label In Dataset")
plt.legend(title="Ministry", loc="center left", bbox_to_anchor=(1.2, 0, 0.5, 1))

# Show the pie chart
# plt.show()
plt.savefig("pie_chart.png")