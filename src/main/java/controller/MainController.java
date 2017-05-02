package controller;

import dto.DBTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import service.SqlService;

import java.util.List;

/**
 * @author boggard
 */
@Controller
public class MainController {

    @Autowired
    private SqlService sqlService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String getIndex() {
        return "index";
    }

    @RequestMapping(value = "/generate_sql", method = RequestMethod.POST)
    @ResponseBody
    public String generateSql(@RequestBody List<DBTable> dbTables) {
        return sqlService.generateSql(dbTables).toString();
    }
}

