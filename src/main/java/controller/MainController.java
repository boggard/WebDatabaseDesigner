package controller;

import dto.DBTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import service.SqlService;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    @RequestMapping(value = "/generate_sql", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void generateSql(@RequestBody List<DBTable> dbTables, HttpServletResponse response) throws IOException {
        byte[] bytes = sqlService.generateSql(dbTables);
        String fileName = "dump.sql";
        response.setContentType("application/octet-stream");
        response.setContentLength(bytes.length);
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-Disposition", "filename=\"" + fileName + "\"");
        response.getOutputStream().write(bytes);
        response.flushBuffer();
    }

    @RequestMapping(value = "/parse_sql", method = RequestMethod.POST)
    @ResponseBody
    public List<DBTable> parseSql(@RequestParam("file") MultipartFile file) throws IOException {
        return sqlService.parseSql(new String(file.getBytes()));
    }
}

