# Full-Stack Development Challenge

## Objective

Your task is to develop a **Recipe Sharing Platform** where users can post, browse, and interact with recipes. This challenge is designed to assess your skills in full-stack development, focusing on React, Tailwind CSS, AdonisJS, and PostgreSQL.

## Minimum Functionality Requirements
- **User Authentication**
  - Registration: Users can sign up by providing basic information (e.g., email, password).
  - Login/Logout: Users can log in to access personal features (like posting recipes) and log out.
- **Recipe Posting**
  - Form Submission: Logged-in users can post new recipes via a form that captures essential details:
    - Title: The name of the recipe.
    - Ingredients: A list of ingredients required.
    - Preparation Steps: Step-by-step cooking instructions.
    - Photo Upload: Allow users to upload a photo of the dish.
- **Recipe Browsing**
  - Gallery View: All visitors (logged in or not) can view a list or gallery of recipes. Each entry should show at least the title and a photo (if available).
  - Search/Filter: Users can search for recipes by title.
- **Recipe Details**
  - Detailed View: Users can click on a recipe in the gallery to view its full details, including ingredients, preparation steps, and photos.
- **Recipe Editing and Deletion**
  - Allow users to edit or delete their own recipes.
- **Data Validation and Error Handling**
  - Form Validation: Ensure the recipe submission form validates input (e.g., no empty fields, proper format).
  - Server-side Validation: The backend should validate data before processing to prevent invalid data storage.
  - User Feedback: Provide clear error messages or success notifications to the user.
- **Responsive Design**
  - Ensure the app looks good and functions well on various devices and screen sizes.

### Optional Enhancements
These are not required but can be considered as enhancements if time and skill level permit:
- Implement a system where users can comment on or rate recipes.
- Friendly routes for the recipes based on their name.
- Users can filter by ingredients/categories.


### Technical Considerations

**Front-End**: Use React for building the UI components and Tailwind CSS for styling.

**Back-End**: AdonisJS should manage API requests, including CRUD operations for recipes, and handle authentication.

**Database**: PostgreSQL will store user and recipe data. Design your schema to support the functionalities outlined above. Use Adonis migrations and seeds as needed.

## Setup

1. **Fork this repository**: Click on the "Fork" button at the top right of this page to create a copy of this repository in your GitHub account.
2. **Clone your fork**: Clone the forked repository to your local machine.
3. **Install dependencies**: Navigate into both the `frontend` and `backend` directories in your terminal and run `npm install` to install the necessary dependencies.

## Project Structure

Your project should be organized into two main folders:

- `frontend`: This directory will contain your React application.
- `backend`: This directory will house your AdonisJS backend application.

Please ensure that your code is well-organized and follows best practices for the respective technologies.

## Submission Guidelines

1. **Commit your changes**: Make regular commits to your repository with clear, descriptive commit messages.
2. **Push your commits**: Once you have completed the challenge, push your commits to your forked repository.
3. **Create a Pull Request**: Submit a pull request to the original repository. In the pull request description, provide a summary of your implementation and any special instructions needed for running your application.

## Evaluation Criteria

- **Code Quality**: Is the code clean, well-organized, and properly commented?
- **Functionality**: Are all the required features implemented and working as expected?
- **Design and User Experience**: Is the application easy to use and visually appealing?
- **Attention to Detail**: Did you follow the setup and submission instructions accurately?

Good luck with the challenge! We look forward to reviewing your submission.
