package com.istiak.timezone.service;

import com.istiak.timezone.constants.ErrorMessageConstants;
import com.istiak.timezone.exception.HttpException;
import com.istiak.timezone.model.TimeZoneDataModel;
import com.istiak.timezone.data.model.Timezone;
import com.istiak.timezone.data.repository.TimezoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class TimeZoneValidationService {
    @Autowired
    private TimezoneRepository timezoneRepository;

    public void validateForCreate(TimeZoneDataModel timeZoneDataModel) {
        String errors = checkIfValidTimeZone(timeZoneDataModel);
        if(errors.length()>0) {
            throw new HttpException(HttpStatus.BAD_REQUEST, errors);
        }
        else if(checkIfTimeZoneAlreadyExists(timeZoneDataModel)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.TIMEZONE_ALREADY_EXIST);
        }
    }

    public void validateForDelete(String name) {
        StringBuffer errorMsg = new StringBuffer("");
        if(name == null || name.trim().isEmpty()) {
            errorMsg.append(ErrorMessageConstants.TIMEZONE_NAME_EMPTY);
        } else {
            Timezone timezone =  timezoneRepository.findByName(name);
            if(timezone == null) {
                errorMsg.append(ErrorMessageConstants.TIMEZONE_NOT_EXIST);
            }
        }

        if(errorMsg.toString().length()> 0) {
            throw new HttpException(HttpStatus.BAD_REQUEST, errorMsg.toString());
        }
    }

    public void validateForUpdate(TimeZoneDataModel timeZoneDataModel) {
        if(timeZoneDataModel == null || timeZoneDataModel.getName().trim().isEmpty()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.TIMEZONE_INVALID_DATA);
        }

        Timezone timezone = timezoneRepository.findByName(timeZoneDataModel.getName());
        if(timezone == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.TIMEZONE_NOT_EXIST);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = (String) authentication.getPrincipal();
        if(!timezone.getEmail().equalsIgnoreCase(userEmail) && !checkIfUserHasAdminRole()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.TIMEZONE_DELETE_PERMISSION);
        }
    }

    public String checkIfValidTimeZone(TimeZoneDataModel timeZoneDataModel) {
        StringBuffer errorMsg = new StringBuffer("");
        if(timeZoneDataModel == null) {
            return ErrorMessageConstants.TIMEZONE_INVALID_DATA;
        }
        if(timeZoneDataModel.getName().trim().isEmpty()) {
            errorMsg.append(ErrorMessageConstants.TIMEZONE_NAME_EMPTY);
        }
        if(timeZoneDataModel.getCity().trim().isEmpty()) {
            errorMsg.append(ErrorMessageConstants.TIMEZONE_CITY_EMPTY);
        }

        if(timeZoneDataModel.getHourDiff()==null || timeZoneDataModel.getHourDiff()<-14 || timeZoneDataModel.getHourDiff()>12) {
            errorMsg.append(ErrorMessageConstants.TIMEZONE_HOUR_RANGE);
        }

        if(timeZoneDataModel.getMinuteDiff()==null || timeZoneDataModel.getMinuteDiff()<0 || timeZoneDataModel.getMinuteDiff()>59) {
            errorMsg.append(ErrorMessageConstants.TIMEZONE_MINUTE_RANGE);
        }

        return errorMsg.toString();

    }

    public Boolean checkIfTimeZoneAlreadyExists(TimeZoneDataModel timeZoneDataModel) {
        Timezone timezone =  timezoneRepository.findByName(timeZoneDataModel.getName());

        return timezone != null;
    }

    private Boolean checkIfUserHasAdminRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Optional<? extends GrantedAuthority> authority = authorities.stream()
                .filter(a -> a.getAuthority().equalsIgnoreCase("ROLE_ADMIN"))
                .findFirst();
        if(authority.isPresent()) {
            return true;
        } else {
            return false;
        }
    }
}
