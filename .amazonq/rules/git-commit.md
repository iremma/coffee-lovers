Everytime you do a git commit, make sure to follow these format:

```
<type>(<scope>): <subject>
<body>
<footer>
```

Where:  
- `<type>`: Describes the type of change that this commit is introducing. Common types include:
  - `feat`: A new feature
  - `fix`: A bug fix
  - `docs`: Documentation changes
  - `style`: Code style changes (formatting, missing semi-colons, etc.)
  - `refactor`: Code changes that neither fix a bug nor add a feature
  - `test`: Adding or updating tests
  - `chore`: Changes to the build process or auxiliary tools and libraries
- `<scope>`: A noun describing a section of the codebase enclosed in parentheses, e.g., `core`, `api`, `ui`. This is optional but recommended.
- `<subject>`: A brief summary of the changes made in the commit. It should be concise and written in imperative mood (e.g., "fix bug" not "fixed bug" or "fixes bug").
- `<body>`: A more detailed explanation of the changes made in the commit. This is optional but recommended for complex changes. It can include the motivation for the change and contrast with previous behavior.
- `<footer>`: Any additional information, such as links to issues or breaking changes. This is optional.