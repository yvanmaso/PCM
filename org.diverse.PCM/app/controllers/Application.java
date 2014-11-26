package controllers;

import java.util.ArrayList;

import play.mvc.Controller;
import play.mvc.Result;

public class Application extends Controller {
    
    public static Result index() {
        return ok(views.html.page.render());
    }
    public static Result test(){
    	ArrayList<Entry> list =new ArrayList<Entry>();
    	Entry e=new Entry();
    	list.add(e);
    	return ok(views.html.test.render(list));
    }
    
}
