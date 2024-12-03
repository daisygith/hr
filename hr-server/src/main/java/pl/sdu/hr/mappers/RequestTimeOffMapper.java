package pl.sdu.hr.mappers;

import pl.sdu.hr.models.RequestTimeOff;
import pl.sdu.hr.payload.dto.RequestTimeOffDto;

import java.time.LocalDate;

import static java.time.temporal.ChronoUnit.DAYS;

public class RequestTimeOffMapper {

    private static long getDaysDifference(RequestTimeOff requestTimeOff) {
        LocalDate startDate = requestTimeOff.getStartDate().toLocalDate();
        LocalDate endDate = requestTimeOff.getEndDate().toLocalDate();
        return DAYS.between(startDate, endDate) + 1;
    }

    public static RequestTimeOffDto mapRequestTimeOffToRequestTimeOffDto(RequestTimeOff requestTimeOff){
        RequestTimeOffDto requestTimeOffDto = RequestTimeOffDto.builder()
                .id(requestTimeOff.getId())
                .leaveType(requestTimeOff.getLeaveType())
                .reason(requestTimeOff.getReason())
                .startDate(requestTimeOff.getStartDate())
                .endDate(requestTimeOff.getEndDate())
                .days(getDaysDifference(requestTimeOff))
                .employeeId(requestTimeOff.getEmployee().getId())
                .employeeName(requestTimeOff.getEmployee().getName())
                .image(requestTimeOff.getEmployee().getImage())
                .build();

        return requestTimeOffDto;
    }

}
