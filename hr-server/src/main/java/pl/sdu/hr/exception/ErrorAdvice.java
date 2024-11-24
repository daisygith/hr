package pl.sdu.hr.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import pl.sdu.hr.payload.response.MessageResponse;

import java.sql.SQLIntegrityConstraintViolationException;

@ControllerAdvice
public class ErrorAdvice {

    @ResponseBody // odp mogła zostać przemapowana do odpowiedzi json-a
    @ExceptionHandler(MethodArgumentNotValidException.class) //zawiera klase która bedzie obsługiwana
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public MessageResponse MethodArgumentNotValidHandler(MethodArgumentNotValidException ex){
        return new MessageResponse(ex.getMessage());
    }

    @ResponseBody // odp mogła zostać przemapowana do odpowiedzi json-a
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class) //zawiera klase która bedzie obsługiwana
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public MessageResponse SQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException ex){
        return new MessageResponse(ex.getMessage());
    }

    @ResponseBody // odp mogła zostać przemapowana do odpowiedzi json-a
    @ExceptionHandler(Exception.class) //zawiera klase która bedzie obsługiwana
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public MessageResponse handleGlobalException(Exception ex){
        return new MessageResponse(ex.getMessage());
    }

}
