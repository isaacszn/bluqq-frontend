The README file currently contains Laravel's default content. Below, I'll provide installation steps specific for the Block project. You can update the README file accordingly:

##Installation
Follow these steps to set up the Block project on your local machine:

1. Clone the repository:
  ` git clone https://github.com/isaacszn/Block.git
cd Block`
2. Install dependencies: Make sure you have Composer installed, then run:
   `composer install`
3. Set up environment variables: Copy the .env.example file to .env:
   `cp .env.example .env   `
4. Generate application key:
   `php artisan key:generate`
5. Set up the database:

    i. Ensure you have a database created and credentials configured in the .env file.
    ii. Run migrations:
    `php artisan migrate  `
6. Seed the database (optional): If the project includes seeders, populate the database with initial data:

    `php artisan db:seed     `
7. Run the development server: Start the Laravel development server:
   `php artisan serve   `
8. The application should now be accessible at http://localhost:8000.
9. 
