-----------------PCM Documentation----------------
#Introduction

 ##	Global function :
 The product comparison matrix is designed to help determine which product is the right fit for people & their management needs.
 Product comparison matrices (PCMs) provide a convenient way to document the discriminant features of a family of related products.
 ##	Scope:
 This project contains development artifacts used to perform research around product comparison matrices (PCM).
 PCM's repository on github is formed by nine (9) projects but the majors are:
 * org.diverse.PCM.model: which contains the data (metamodel and model) and takes care of the code source generation and,
 * org.diverse.PCM.io.Wikipedia: parses Wikipedia and creates PCMs.
 This document will mainly study those two.

# Installation

 ##Pre-required
 The minimum version of JDK - 1.7 should be installed.

 ##Installation & Configuration
 In order to get PCM's project work properly, we need to install its environment and make some configurations.
 Thus, we need to install development tools that are :
 #*	Git
 http://git-scm.com/downloads
 Configuration task :
 Unlike windows Systems, Linux and Mac OS need some additional configurations:
 On Linux, follow these steps to get it work properly,
 * Unzip your file just downloaded
 *On a terminal type:
 - git config --global color.diff auto
 - git config --global color.status auto
  git config --global color.branch auto
 They will activate color on git to help read terminal messages more easily. Theses commands need to be type one time.
 * Configure our name and our email :
     git config –-global user.name "a user name",
     git config –-global user.emailmoi@email.com
 * Edit the configuation file: .gitconfig, here add an alias section at the end:
     vim ~/.gitconfig
     add this to the file:
 [alias]
 ci = commit
 co = checkout
 st = status
 br = branch
 The aim is to alias git commands, for instance instead of writing checkout one can write co.
 #*Maven – download the most recent bin.zip version here :
 http://maven.apache.org/download.cgi
 Configuration task :
 *	Unzip the zip file,
 *	Create an environment variable,
 *	Fix the value of the variable to the path to the maven bin directory ,
 *	Add the variable to the system PATH,
 Test maven installation on a terminal: type : ‘mvn –version’;
 #*	IntelliJ - with the KMF plugin. Download it here:
 https://www.jetbrains.com/idea/download/
 Choose a community version according to the OS we have (Win, MAC or LINUX).
 Download the project: Clone the project from its github repository:
 *For the project create a branch in our personal space on Github
 * Clone the project :
  With GitBash :
 Type : git clone https://github.com/gbecan/PCM (destination file)
  Using Graphical interface using INTELLIJ:
  VCS -> Checkout from version control -> Git -> copy
 https://github.com/gbecan/PCM  in Git Repository URL field.
 In addition, we also need to install a framework PCM works with :
 #* Kevoree Modeling Framework (KMF)
 https://github.com/dukeboard/kevoree-modeling-framework
 To get KMF:
 	*clone it with:
 GitBash type : git clone http://github.com/dukeboard/kevoree-modeling-framework (KEVOREE directory and PCM should be place in the same directory)
  using Graphical interface using INTELLIJ :
 VCS -> Checkout from version control -> Git -> copy
 http://github.com/dukeboard/kevoree-modeling-framework in Git Repository URL field.
 	Review the last commit, type:
 	get into the KEVOREE directory and
 	git checkout ‘a758cf07ded04e3dfc44b26bca7fcff8426d5495’.

 ##Troubleshooting:
 Once the environment is set and the project cloned, open it with INTELLIJ and generate the maven project:
  File -> Open -> Select the POM.xml file of the root's project in the dialog box -> OK
 We can notice problems in the Maven project as shown here:
        **link : Image 1: Maven Project Troubleshooting
 Resolution Steps:
 *For each underlined package, open its POM.XLM
 It is recommended to start with the org.diverse.PCM.api.java.impl package.

  *	Look for <dependency> tags that are pointed out by the error messages when trying to clean install the Package (in the maven project).
       **link : Image 3:Dependency

  *Then, go to the Maven repository website (here : www.mvnrepository.com) and search for the artifact or the groupid of the dependency, choose the version we 're interested in.
       **link:  Image 4:Maven Repository

 *Copy and paste its correct code, save the POM file, compile the package in the MAVEN project and import Maven Project's Changes.

And then the org.diverse.PCM.model. (In fact, other error packages depend on these ones, thus, their dependency problems will be fixed automatically).
 *Now make a clean install on the project's root and we notice that the org.diverse.PCM.play-app has an activator bug. In fact, Play is not yet installed and the path to the activator is not precise either.
Play (to install once we get the project). To resolve it in the terminal (path - repository ‘org.diverse.PCM.play-app’) write ‘activator.bat’

##System Overview

#System Architecture
The architecture defines structure of our PCM project in terms of organization of its functions.
It describes how the different parts communicate with each other and its role in the project.

MDF (level 4): it is the most abstract level of the project. It is the core of our project.
The MDF, pcm.ecore, shall in no case be changed because it is the Meta Meta-model of the PCM project.
Meta-model: it is the basis of our project. And all new features must obey these principles. Meta-model is an instance of MDF (namely Meta Meta-model).
The following the class diagram associated to Meta-model project:
       **link :Diagram 1:MetaModel Pyramid
Model: it is an instance of Meta-model. In our project it represents the different packages for example org.diverse.PCM.io.Wikipedia.
Project:
The project contains different packages:
*org.diverse.PCM.api.java: This package contains the different interfaces of our PCM project. It is basing on the Meta-model. It contains all the necessary interfaces to the different treatments on the matrices of comparison. In these different interfaces are operations that will allow to recover comparison matrices from PCM files.
The diagram represents an extract of this package is below.
      **link :API.PCM Class Diagram
*org.diverse.PCM.api.js :     This package contains the JS interfaces.
*org.diverse.PCM.api.java.impl: It contains all the classes implementations of package org.diverse.PCM.api.java. We have concrete objects in this package. We base ourselves on this package for doing tests on org.diverse.PCM.io.Wikipedia in the concrete class WikipediaMinerTest.
*org.diverse.PCM.api.js.impl: Jsimplementation
*org.diverse.PCM.model: It contains the meta-model, all the project follows this model.
*org.diverse.PCM.naiveFrontEnd: a naive website to show how to manipulate model in a browser.
The aim of Front-End is to make web pages more ergonomic (visual aesthetics) and make more accessible the functional part (navigation on web pages).
He also takes care of portability, quality and referencing website by taking into account the different platforms and browsers used and applied with respect integration (for better visibility) web pages with new techniques.
*org.diverse.PCM.io.ShoppingWebSite: It parses shopping.com and creates PCMs
*org.diverse.PCM.io.Wikipedia: parses wikipedia and creates PCMs
We work at this level of the project. This package allows us to recover matrices of comparison from the web site of Wikipedia. The parser is in charge of parsing different web pages wikipedia for the final one recover only the matrices and put it into PCM file in script form containing only an array. This table (script PCM) contains different data matrix that we recovered on the web page.
*org.diverse.PCM.play-app: will contain the web editor
This is used to prepare or edit this page. The parsing is performed at the web editor. There are more details on the play in the part that talks about the role of play in the project

 PLAY
Play in a web open source framework used to write web application in Java or Scala quickly. Play is not based on Java motor 's Servlet. It's then easy to have a project's skeleton and then run the play server to get a home page.
Play gives all the necessary links to the website (database conations, mapping),manages errors(by giving the page causing it), allows quick re-compilation in case of saved modification on a file, has extensible modules for security(secure) and automatic generation of administrative data pages (crud).
Our play project's main directory are:
−	app/ (contains the heart of the application with the MVC design pattern. The Java classes will be stored in here).
−	conf/ ( stores the configuration files, routes definition and files for internationalization)
−	lib/ (contains optional Java libraries)
−	public/ (stores public resources like images, Javascript or CSS files)
−	test/ (contains test files. Theses latest may be Java Test with JUNIT or SELENIUM)

 KEVOREE
KMF supplies runtime-oriented features such as: Memory optimized object oriented modeling API JS (Browser, NodeJS) and JVM cross-compiled models Efficient visitors for models traversal Unique path for each model element Optimized query language to lookup model elements
Trace operators to atomize model operations into low-level primitive sequences :
−	Built-in load/save operation in JSON/XMI format
−	Built-in clone strategies (mutable elements only, copy on write)
−	Built-in merge and diff operators
−	Persistence layer for BigModels with lazy load policy
−	Distributed data store for BigData models

## System Functionalities

 #Design method
 PCM's project contains several projects, but the main one is the Wikipedia projet.The Visitor design pattern is used in that project. It can be found in the org.diverse.PCM\org.diverse.PCM.io.
 Wikipedia\src\main\scala\org.diverse.PCM.io.Wikipedia\pcm\parser directory.
 Why is this pattern used in that project?
 Classes in Wikipedia follow the closed principle in Object-Oriented programming. In addition, they are stored in a format which is difficult to understand. Methods in the PCM project need to work with those classes, thus, the Visitor design pattern must be used to gather information about the exact type of their instances and find out the treatment that best fits their public details.
 In practice, Visitor Design Pattern works as follows: each "visited" class should provide a public method "accept" that can take the "visitor" as an argument.
 In this case, the visitor classes are PageVisitor, TableVisitor, PreprocessVisitor, NodeToTextVisitor.
 The sequence is as follows:
 *PageVisitor visits a page then,
 *TableVisitor visits the tables in that page then,
 *Calls the NodeToTextVisitor to visit the cells on the tables then,
 *PreprocessVisitor makes the preprocessed code of the page and the client is the WikipediaPCMParser class.
 The "accept" method calls the "visit" method of the visitor that takes the visited object as an argument. Thus, the visitor knows the object's reference and is able to get data it needs to proceed.
 In our specific case, Visitor will add new virtual methods to Wikipedia's classes so that they can be manipulated.
          **link : Diagram 4:Visitor Diagram Class

 #Wikipedia Functionnality
 Wikipedia's functionality can be describe as follows:
          **link :Diagram 5:Wikipedia Diagram
 We can divide this process in 2 stages:
 *The recovery stage:
 The WikipediaPager class is used during this stage.The input parameter is the Wikipedia page title  and the output is the source code of the page that one can obtain using the Edit link in The Wikipedia web page.Then, the "preprocessed" method uses this output as an input to take off the templates from the source code.

 * The parsing stage:
 The Pager class is used here. During this stage, the Pager Class uses the source code generated by the preprocessed method to create an intermediate structure "Page".Then, Page is used to  produce PCM, CSV or HTML representation as output. The PCM representation which shows products and their features is the one we are interested in.

Wikipedia Sequence Diagram
    link:Diagram 6: Wikipedia Sequence Diagram

##	Test
 Testing of our PCM project was carried out at org.diverse.io.PCM.Wikipedia, which is a main part of our application. The tests belong to 2 classes such as java and scala types.
 The 2 classes are:
 *WikipediaMinerTest.java
 *ParseTest.scala
 link:Image 6 : Test Result
 The tests were carried out successfully. 
 It is necessary to focus on file "WikipediaMinerTest.java".
 A following diagram shown below presents this.
 The test monitors this file in the following way:
link:Image 7:PCM process
The tests show that the output files obtained after the parsing phase in 3 formats (CSV, HTML, PCM) are not nulls.
# Control of no-empty PCM
In order to the test that the PCM returns will be ‘not null’, it is necessary to browse beginning with the products and the features, next check if they really exist the corresponding cells to the products and features