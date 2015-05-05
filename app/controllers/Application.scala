package controllers

import play.api._
import play.api.mvc._

case class Project(val yearmonth: Int, val dict: Map[Symbol, String], val images: List[String]) {
  private val undefined = "Undefined"

  val logo = dict.get('logo)
  val name = dict.getOrElse('name, undefined)
  val desc = dict.getOrElse('desc, undefined)
  val date = dict.getOrElse('date, undefined)
  val web = dict.get('web)
  val lang = dict.get('lang)
  val tpe = dict.getOrElse('type, undefined)
  val kw = dict.getOrElse('keyword, undefined)

  val gridA = dict.getOrElse('gridA, "col-xs-12 col-sm-6 col-md-4")
  val gridB = dict.getOrElse('gridB, "col-xs-12 col-sm-6 col-md-8")
}

object Application extends Controller {

  val projects = List(
    Project(201209,
      Map(
        'logo -> "logo.png",
        'name -> "ARM based Dynamic Scheduling",
        'desc -> "The main target of the project was to design a dynamically scheduled processor based on the ARM architecture.",
        'date -> "Automn 2012",
        'web -> "http://lap.epfl.ch",
        'lang -> "VHDL, ARM asm",
        'type -> "Design on FPGA",
        'keyword -> "lapbachelor",
        'gridA -> "col-xs-12 col-sm-6 col-md-6",
        'gridB -> "col-xs-12 col-sm-6 col-md-6"
      ), List(
        "screenshot1.png",
        "screenshot2.png"
      )
    ),
    Project(201200,
      Map(
        'logo -> "logo.png",
        'name -> "ForumEPFL",
        'desc -> "Design of the Android application to have access to the program, find a company's presentation date, localize a specific stand, read companies profiles and log in to your user account.",
        'date -> "2011-2012",
        'web -> "http://forum.epfl.ch",
        'lang -> "Java (Android)",
        'type -> "Android App",
        'keyword -> "forumepfl"
      ), List(
        "screenshot1.png",
        "screenshot2.png",
        "screenshot3.png"
      )
    ),
    Project(201301,
      Map(
        'logo -> "logo.png",
        'name -> "Qloudlab",
        'desc -> "Creation of the prototype of an Android App to fetch and perform multiple professional medical diagnostics and connect the test results through mobile application.",
        'date -> "2013",
        'web -> "http://qloudlab.com/",
        'lang -> "Java (Android)",
        'type -> "Android App",
        'keyword -> "qloudlab"
      ), List(
        "screenshot1.png",
        "screenshot2.png",
        "screenshot3.png"
      )
    ),
    Project(201400,
      Map(
        'name -> "ARPiBot",
        'desc -> "ARPi-Bot which stands for Android-Raspberry Pi-Bot is a project to build a robot upon a Raspberry Pi, an Android device and a Silicon Laboratories C8051F340 board.",
        'date -> "Since 2014",
        'web -> "https://github.com/ThmX/ARPi-Bot",
        'lang -> "Scala, Scala (Android), C51",
        'type -> "Raspberry Pi / Android / uC",
        'keyword -> "arpibot",
        'gridA -> "col-xs-12 col-sm-6 col-md-6",
        'gridB -> "col-xs-12 col-sm-6 col-md-6"
      ), List(
        "ARPiBot.png"
      )
    ), //
    Project(201401,
      Map(
        'logo -> "logo.png",
        'name -> "LAP Submit",
        'desc -> "Design of the Computer Architecture laboratory automated grading system built on top of Jenkins (jenkins-ci.org) interconnecting several system together.",
        'date -> "2013-2014",
        'web -> "http://lap.epfl.ch",
        'lang -> "Bash, Perl, Groovy, Java, Jenkins Plugins (Java, Groovy)",
        'type -> "Jenkins Plugins",
        'keyword -> "lapsubmit",
        'gridA -> "col-xs-12 col-sm-6 col-md-6",
        'gridB -> "col-xs-12 col-sm-6 col-md-6"
      ), List(
        "lapsubmit1.jpg",
        "lapsubmit2.jpg"
      )
    ),
    Project(201309,
      Map(
        'logo -> "logo.png",
        'name -> "LAP Projects",
        'desc -> "Design of the WebApp to manage the semester projects of the LAP lab.",
        'date -> "2013-2014",
        'web -> "http://lap.epfl.ch",
        'lang -> "Java with Spring",
        'type -> "WebApp with Spring",
        'keyword -> "lapprojects",
        'gridA -> "col-xs-12 col-sm-6 col-md-6",
        'gridB -> "col-xs-12 col-sm-6 col-md-6"
      ), List(
        "lapprojects1.jpg",
        "lapprojects2.jpg"
      )
    )
  )

  def index = Action {
    Ok(views.html.index(projects.sortBy(_.yearmonth)))
  }

}