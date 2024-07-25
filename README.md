# File Management Automation

This project automates file management tasks such as creating, deleting, renaming, and appending content to files based on commands specified in a `command.txt` file.

## Features

- **Create a File:** Creates a new file if it doesn't already exist.
- **Delete a File:** Deletes the specified file if it exists.
- **Rename a File:** Renames a file from the old name to the new name.
- **Add to a File:** Appends specified content to a file, creating the file if it doesn't exist.

## Project Structure

- app.js # Main application file
- lib.mjs # Module with file management functions
- command.txt # Command file to specify the file operations

## How It Works

The application continuously watches the `command.txt` file for changes. When a change is detected, it reads the command from the file and performs the corresponding file operation.

### Commands Format

- **Create a file:** `create a file <file_path>`
- **Delete a file:** `delete a file <file_path>`
- **Rename a file:** `rename a file <old_file_path> to <new_file_path>`
- **Add to a file:** `add to a file <file_path> content : <content>`

### Examples

- To create a file named `example.txt`:
  - create a file example.txt
- To delete a file named `example.txt`:
  - delete a file example.txt
- To rename `example.txt` to `example-renamed.txt`:
  - rename a file example.txt to example-renamed.txt
- To add content to `example.txt`:
  - add to a file example.txt content : This is the content that goes to the file

## Usage

1. Clone the repository:

```bash
git clone https://github.com/fm-durodola/File-Management-Automation.git
 cd your-repo-name
```

2. Run the application:

   ```bash
   node app.js
   ```
3. Edit the `command.txt` file to specify the file operations you want to perform.

## License

This project is licensed under the MIT License - see the [LICENSE]() file for details.
