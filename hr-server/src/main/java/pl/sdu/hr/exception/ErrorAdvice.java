package pl.sdu.hr.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.SQLIntegrityConstraintViolationException;

@ControllerAdvice
public class ErrorAdvice {

    @ResponseBody // odp mogła zostać przemapowana do odpowiedzi json-a
    @ExceptionHandler(MethodArgumentNotValidException.class) //zawiera klase która bedzie obsługiwana
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String MethodArgumentNotValidHandler(MethodArgumentNotValidException ex){
        return ex.getMessage();
    }

    @ResponseBody // odp mogła zostać przemapowana do odpowiedzi json-a
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class) //zawiera klase która bedzie obsługiwana
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String SQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException ex){
        return ex.getMessage();
    }

}
