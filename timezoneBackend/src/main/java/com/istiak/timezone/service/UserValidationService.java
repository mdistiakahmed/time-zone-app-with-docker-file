package com.istiak.timezone.service;

import com.istiak.timezone.constants.ErrorMessageConstants;
import com.istiak.timezone.exception.HttpException;
import com.istiak.timezone.data.model.User;
import com.istiak.timezone.model.UserCreateModel;
import com.istiak.timezone.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserValidationService {
    public final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$", Pattern.CASE_INSENSITIVE);

    String regex = "(?=\\S+$).{6,20}$"; // no white space and length min 8, max 20
    public final Pattern VALID_PASSWORD_REGEX =
            Pattern.compile(regex);
    @Autowired
    private UserRepository userRepository;

    public void validate(UserCreateModel userCreateModel) {
        String errors = checkIfInvalidData(userCreateModel);
        if(errors.length()>0) {
            throw new HttpException(HttpStatus.BAD_REQUEST, errors);
        }
        if(checkIfUserExists(userCreateModel.getEmail())) {
            throw new HttpException(HttpStatus.CONFLICT, ErrorMessageConstants.USER_ACCOUNT_ALREADY_EXISTS);
        }
    }

    public String checkIfInvalidData (UserCreateModel userCreateModel) {
        String errorMsg = "";
        if(userCreateModel == null) {
            return ErrorMessageConstants.USER_INVALID_DATA;
        }

        if(userCreateModel.getEmail() == null || userCreateModel.getEmail().trim().length()==0
            || !validateEmail(userCreateModel.getEmail())) {
            errorMsg += ErrorMessageConstants.USER_INVALID_EMAIL;
        }

        if(userCreateModel.getPassword() == null || userCreateModel.getPassword().length() == 0
            || !validatePassword(userCreateModel.getPassword())) {
            errorMsg += ErrorMessageConstants.USER_INVALID_PASSWORD;
        }

        return errorMsg;
    }

    public Boolean checkIfUserExists (String email) {
        User user = userRepository.findByEmail(email);
        return user == null ? false : true;
    }

    public void userModifyValidate (String username) {
        final String authenticatedUser = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        String errorMsg = "";
        if(username == null || username.length()==0) {
            errorMsg = ErrorMessageConstants.USER_INVALID_DATA;
        } else if(username.equalsIgnoreCase(authenticatedUser)) {
            errorMsg = ErrorMessageConstants.USER_OWN_DATA_MODIFY;
        } else {
            User user = userRepository.findByEmail(username);
            if(user == null) {
                errorMsg = ErrorMessageConstants.USER_ACCOUNT_NOT_EXISTS;
            }
        }

        if(errorMsg.length()>0) {
            throw new HttpException(HttpStatus.BAD_REQUEST, errorMsg);
        }
    }


    private boolean validateEmail(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        return matcher.find();
    }

    private boolean validatePassword(String password) {
        Matcher matcher = VALID_PASSWORD_REGEX.matcher(password);
        return matcher.find();
    }

}
