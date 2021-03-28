# O-Sci-Lator (Optical Character Recognition powered Scientific Calculator)

## Description: What is OCR?
Optical character recognition or optical character reader is the electronic or mechanical conversion of images of typed, handwritten or printed text into machine-encoded text, whether from a scanned document, a photo of a document, a scene-photo or from subtitle text superimposed on an image.

## Use the webpage!
The project is live and accessible in [o-sci-lator.me](http://o-sci-lator.me)

It can take up to 30 seconds for server to redeploy, so please be patient :)

**However**, if you wish to run it locally, you can [proceed](#installation-and-run) to the installation part.

## Installation and Run
To install and run this Node.JS + HTML + CSS + JS app on your local machine you will need to do bunch of steps first :
- [Download and install node.js and npm](#download-and-install-nodejs-and-npm)
- [Clone this repository to your computer](#clone-this-repository-to-your-computer)
- [Open terminal and `cd` into cloned repo's directory](#open-terminal-and-cd-into-cloned-repos-directory)
- [Install dependencies using `npm` node package manager](#install-dependencies-using-npm-node-package-manager)
- [Run the app on your machine](#run-the-app-on-your-machine)


## Download and install node.js and npm
### Check if it's already installed
Firstly, if there is a chance of node.js and npm being already installed on your computer, check them by :
```
node --version
npm --version
```
So if these output you anything, like *v12.16.1* or *6.5.1*, it means you already have node.js installed on your machine.

If not, please do the below steps to install it properly.

### For Windows machines
If you have Windows as your OS, you can download and install node.js easily on
> https://nodejs.org/en/download/

make sure you choose **windows installer**.

### For Linux (Unix) machines
One of most ways to install node.js and npm in your linux machine, is to install it by [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager).We suggest you to do it this way as it is a practical tool for managing multiple Node.js versions. 
#### 1. To install NVM, download the installation script from Github.For that, you will use the curl command line.
   - If you do not have `curl`, install it by running:
   
   - `sudo apt install curl`
   
   - Press **y** to confirm the installation and hit **Enter**
   
#### 2. Now, download the NVM installation script with the command:
   - `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
   - After it automatically clones the NVM repository and adds the NVM path to ZSH or Bash, you will receive the        following output:
   
![Couldn't found image](https://phoenixnap.com/kb/wp-content/uploads/2019/03/download-nvm-installation-script.png   'NVM post-installation output')

#### 3. To **enable nvm**:
   - Close and open the terminal or
   - Run the given command in the above figure

#### 4. Check whether the installation was successful by verifying `nvm` version:
   - `nvm --version`
   
   - Once you have installed **`nvm`**, you can find a list of all the available Node.js versions with the command: 
   
   - `nvm ls-remote`
   
   - This will list all available versions of **`nvm`**
   
![Couldn't found image](https://phoenixnap.com/kb/wp-content/uploads/2019/03/list-available-nvm-versions.png 'Output of the comment nvm ls-remote')

#### 5. Finally, install a specific version
   - NVM is a package manager; it can install and manage multiple Node.js versions.
   
   - To install a particular version, use the command `nvm install` and add the number of the version.
   
   - For the sake of this particular project, we will use version **14.15.5**
   
   - To install, just type the following command:
   
   - `nvm install 14.15.5`
   
So that's it.Now you have node and npm installed on your machine.You can check the versions by typing:
- **`node --version`**
- **`npm --version`**



## Clone this repository to your computer
Next step is cloning the current repo to your machine to get this Node.JS app installed on your computer. <br />
You can clone it with `git clone` <br />
`git clone https://github.com/faxmishok/o-sci-lator.git`



## Open terminal and `cd` into cloned repo's directory
Once the cloning process is complete, don't close the terminal, type: <br />
`cd o-sci-lator` <br />
instead, this will take you to the project source



## Install dependencies using `npm` node package manager
You will have to install dependencies in two steps.Installation of first step will refer to modules that are required by our back-end source and the second will refer to front-end (react.js) modules.<br /> 
#### 1. To install `node_modules`,
   - First, make sure you are inside the **o-sci-lator** directory
   
   - Then type `npm install` to install the dependencies of back-end source
   

Once the npm install command finishes its job, check if the `node_modules` directory has been created inside the root folder of the project - *o-sci-lator*.<br /><br />
After it's done, you can [proceed](#run-the-app-on-your-machine) to the next step.


## Run the app on your machine
- To run the app:

`npm start`
