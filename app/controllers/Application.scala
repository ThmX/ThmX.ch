package controllers

import play.api._
import play.api.mvc._

case class Project(val dict: Map[Symbol, String], val images: List[String]) {
  private val undefined = "Undefined"

  val logo = dict.get('logo)
  val name = dict.getOrElse('name, undefined)
  val desc = dict.getOrElse('desc, undefined)
  val date = dict.getOrElse('date, undefined)
  val web = dict.get('web)
  val code = dict.get('code)
  val tpe = dict.getOrElse('type, undefined)
  val kw = dict.getOrElse('keyword, undefined)

  val gridA = dict.getOrElse('gridA, "col-xs-12 col-sm-6 col-md-4")
  val gridB = dict.getOrElse('gridB, "col-xs-12 col-sm-6 col-md-8")
}

object Application extends Controller {

  val projects = List(
    Project(
      Map(
        'logo -> "logo.png",
        'name -> "ARM based Dynamic Scheduling",
        'desc -> "The main target of the project was to design a dynamically scheduled processor based on the ARM architecture.",
        'date -> "Automn 2012",
        'web -> "http://lap.epfl.ch",
        'type -> "Design on FPGA",
        'keyword -> "lapbachelor",
        'gridA -> "col-xs-12 col-sm-6 col-md-6",
        'gridB -> "col-xs-12 col-sm-6 col-md-6"
      ), List(
        "screenshot1.png",
        "screenshot2.png"
      )
    ),
    Project(
      Map(
        'logo -> "logo.png",
        'name -> "ForumEPFL",
        'desc -> "Design of the Android application to have access to the program, find a company's presentation date, localize a specific stand, read companies profiles and log in to your user account.",
        'date -> "2011-2012",
        'web -> "http://forum.epfl.ch",
        'type -> "Android App",
        'keyword -> "forumepfl"
      ), List(
        "screenshot1.png",
        "screenshot2.png",
        "screenshot3.png"
      )
    ),
    Project(
      Map(
        'logo -> "logo.png",
        'name -> "Qloudlab",
        'desc -> "Creation of the prototype of an Android App to fetch and perform multiple professional medical diagnostics and connect the test results through mobile application.",
        'date -> "2013",
        'web -> "http://qloudlab.com/",
        'type -> "Android App",
        'keyword -> "qloudlab"
      ), List(
        "screenshot1.png",
        "screenshot2.png",
        "screenshot3.png"
      )
    ),
    Project(
      Map(
        'name -> "ARPiBot",
        'desc -> "ARPi-Bot which stands for Android-Raspberry Pi-Bot is a project to build a robot upon a Raspberry Pi, an Android device and a Silicon Laboratories C8051F340 board.",
        'date -> "Since 2014",
        'code -> "https://github.com/ThmX/ARPi-Bot",
        'type -> "Raspberry Pi / Android / uC",
        'keyword -> "arpibot",
        'gridA -> "col-xs-12 col-sm-6 col-md-6",
        'gridB -> "col-xs-12 col-sm-6 col-md-6"
      ), List(
        "ARPiBot.png"
      )
    )
  )

  def index = Action {
    Ok(views.html.index(projects))
  }

}