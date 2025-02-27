import json

def load_json_file(file_name):
    """Load JSON file and return its contents."""
    try:
        with open(file_name, 'r') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error reading the file: {e}")
        return None

def save_json_file(data, new_file_name):
    """Save the modified data to a new JSON file."""
    try:
        with open(new_file_name, 'w') as file:
            json.dump(data, file, indent=4)
        print(f"Data saved to {new_file_name}")
    except Exception as e:
        print(f"Error saving the file: {e}")

def process_json(data):
    """Process the JSON data by removing items from keys based on other keys."""
    
    # Convert values to sets to remove duplicates and ease the comparison
    for key in data:
        data[key] = set(data[key])  # Convert each key's value to a set for easier comparison
    
    # Remove from "hard" items that are present in "medium", "easy", or "common"
    if "hard" in data:
        data["hard"] -= data.get("medium", set())
        data["hard"] -= data.get("easy", set())
        data["hard"] -= data.get("common", set())

    # Remove from "special" items that are present in "hard", "medium", "easy", or "common"
    if "special" in data:
        data["special"] -= data.get("hard", set())
        data["special"] -= data.get("medium", set())
        data["special"] -= data.get("easy", set())
        data["special"] -= data.get("common", set())

    # Remove from "medium" items that are present in "easy" or "common"
    if "medium" in data:
        data["medium"] -= data.get("easy", set())
        data["medium"] -= data.get("common", set())

    # Remove from "easy" items that are present in "common"
    if "easy" in data:
        data["easy"] -= data.get("common", set())
    
    # Convert the sets back to tuples (or lists) to keep the order if needed
    for key in data:
        data[key] = tuple(data[key])  # Convert back to tuple to preserve immutability

    return data

def main():
    # Step 1: Get file name from user and load JSON file
    file_name = input("Enter the name of the JSON file to process: ")
    data = load_json_file(file_name)

    if data is not None:
        # Step 2: Print the original data for the keys
        print("\nOriginal Data:")
        for key in data:
            print(f"{key}: {data[key]}")
        
        # Step 3: Process the data based on the conditions
        data = process_json(data)

        # Step 4: Print the processed data (you can see the changes here)
        print("\nProcessed Data:")
        for key in data:
            print(f"{key}: {data[key]}")

        # Step 5: Ask for the new file name to save the changes
        new_file_name = input("Enter the new file name to save the changes: ")

        # Step 6: Save the modified JSON to a new file
        save_json_file(data, new_file_name)
    else:
        print("Failed to load the JSON file.")

if __name__ == "__main__":
    main()
