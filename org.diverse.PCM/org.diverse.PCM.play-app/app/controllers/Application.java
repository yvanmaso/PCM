package controllers;
import java.util.*;

import com.mongodb.util.JSON;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import play.mvc.Controller;
import play.mvc.Result;
import com.mongodb.*;
import org.json.*;
import scala.Array;
import play.*;
import static com.mongodb.util.JSON.*;

public class Application extends Controller {
    
    public static Result index() {
       
        return ok(views.html.index.render("dd"));
    }
    public static Result affiche(){
        final Map<String, String[]> li = request().body().asFormUrlEncoded();
        DBObject obj=null;
        String comment = li.get("cars")[0];
        try {
        MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
        DB db= mongoClient.getDB( "test" );
        DBCollection coll = db.getCollection(comment);
        //coll.toString();
        DBCursor cursor = coll.find().limit(100);
	    while( cursor.hasNext() ){
	             obj = cursor.next();
	          //System.out.println(obj);

	        }
        //System.out.println(obj.toString());
       // JSONObject o = JSON.parse(obj.toString());
        mongoClient.close();
        } catch (Exception e) {
        // TODO Auto-generated catch block

        e.printStackTrace();
    }
         return ok(views.html.index.render(obj.toString()));
    }
    public static Result test(){
        Set<String> li=null;
        try {
            
            // System.out.println(jsonObject.toString());
            int i=0;
            MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
            DB db= mongoClient.getDB( "test" );
            li=db.getCollectionNames();
            
            mongoClient.close();
            
        } catch (Exception e) {
            // TODO Auto-generated catch block
            
            e.printStackTrace();
        }
        ArrayList<String> l = new ArrayList<String>(li);
        l.remove(l.indexOf("system.indexes"));
        l.remove(l.indexOf("maCollection"));
        return ok(views.html.tes.render(l));
    }
    
}
