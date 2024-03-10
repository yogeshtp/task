class Banks {
  constructor() {
    this.isLoggedIn = false;
    this.userData = {};
  }

  login(id, password) {
    if (!this.isLoggedIn) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
          if (xhttp.status == 200) {
            const userList = JSON.parse(xhttp.responseText);

            const userData = userList.find(
              (element) => element.id === id && element.password === password
            );

            if (!userData) {
              console.log(
                "User not found: Please enter proper ID and password"
              );
            } else {
              this.isLoggedIn = true;
              this.userData = userData;
              console.log("Login successfully");
              console.log(`Welcome back ${userData.name}`);
            }
          } else {
            console.error("Error:", xhttp.status);
          }
        }
      };

      xhttp.open("GET", "./data.json");
      xhttp.send();
    } else {
      return "Already logged in!";
    }
  }

  // Method to check if the user is logged in before executing other methods
  checkLogin() {
    if (!this.isLoggedIn) {
      console.log("Please log in first.");
      return false;
    }
    return true;
  }

  balance() {
    if (this.checkLogin()) {
      console.log(`Current balance: $${this.userData.bankBalance}`);
      console.log(this.userData);
    }
  }
  withdraw(amount) {
    try {
      if (!this.checkLogin()) {
        throw new Error("User not logged in");
      }

      if (!(amount > 0 && amount <= this.userData.bankBalance)) {
        throw new Error("Invalid withdrawal amount or insufficient funds");
      }

      if (amount > this.userData.dailyLimit) {
        throw new Error(
          `Your daily limit is ${this.userData.bankBalance}, you cannot exceed your daily withdrawal limit`
        );
      }
      this.userData.bankBalance -= amount;
      console.log(
        `Withdrawal successful. New balance: $${this.userData.bankBalance}`
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  // ---------------------------------------------------------------

  async deposit() {
    if (this.checkLogin()) {
      let userDeposit = await this.getUserInput("Enter the deposit amount");
      let amount = parseFloat(userDeposit);
      if (!isNaN(amount) && amount > 0) {
        this.userData.bankBalance += amount;
        console.log(
          `Deposit successful. New balance: $${this.userData.bankBalance}`
        );
      } else {
        console.log("Invalid deposit amount.");
      }
    }
  }
  async getUserInput(promptText) {
    return new Promise((resolve) => {
      const userInput = prompt(promptText);
      resolve(userInput);
    });
  }

  logOut() {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;
      this.userData = {};
      console.log("Logout successfully");
    } else {
      console.log("You have already been logged out");
    }
  }
}

const bank = new Banks();
// bank.login(1, "Sumit123");
// bank.balance();
// bank.withdraw(50);
// bank.deposit(100);


