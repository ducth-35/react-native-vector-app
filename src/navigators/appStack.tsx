import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { APP_SCREEN } from "./screen-type";
import { LoginScreen } from "@/containers/unAuthStack/login";
import { RegisterScreen } from "@/containers/unAuthStack/register";
import { InputNumberScreen } from "@/containers/unAuthStack/input-phone";
import { VerifyOTPScreen } from "@/containers/unAuthStack/verifycations";
import { SelectAccountType } from "@/containers/unAuthStack/select-account-type";
import { MainTab } from "./main-tab";
import { HomeScreen } from "@/containers/authStack/home";
import CalendaScreen from "@/containers/authStack/calenda";
import { ResultScreen } from "@/containers/authStack/results";
import { PaymentScreen } from "@/containers/authStack/payment";
import { AccountScreen } from "@/containers/authStack/account";
import { SearchScreen } from "@/containers/authStack/search";
import { TutorDetailScreen } from "@/containers/authStack/tutor-details";
import { BookingInfor } from "@/containers/authStack/book-infor";
import { PaymentDetails } from "@/containers/authStack/payment-details";
import { PaymentGuide } from "@/containers/authStack/payment-guide";
import { CalendaParentDetailsScreen } from "@/containers/authStack/calenda-parent-details";
import { BookingInforTutor } from "@/containers/authStack/booking-infor-tutor";
import { RegisterInforParent } from "@/containers/unAuthStack/infor-parent";
import { RegisterInforTutor } from "@/containers/unAuthStack/infor-tutor";
import { ResultsLatest } from "@/containers/authStack/results-latest";
import { LeaningOutcomes } from "@/containers/authStack/learning-outcomes";
import { TeachingClass } from "@/containers/authStack/teaching-class";
import { ClassDetailsParent } from "@/containers/authStack/class-details-parent";
import { HusbandWifeAccount } from "@/containers/authStack/husband-wife-account";
import { ChildrenAccount } from "@/containers/authStack/children-account";
import { AddNewCalendar } from "@/containers/authStack/calenda/add-new-calendar-parent";
import { DetailCalendarTutor } from "@/containers/authStack/calenda/details-calendar-tutor";
import { DetailCalendarParents } from "@/containers/authStack/calenda/details-calendar-parent";
import { AccountTutorDetails } from "@/containers/authStack/account/account-tutor-details";
import { AccountParentsDetails } from "@/containers/authStack/account/account-parents-details";
import { ConfirmPassword } from "@/containers/unAuthStack/create-password/confirm-password";
import { CreatePassword } from "@/containers/unAuthStack/create-password";
import { OnBroading } from "@/containers/unAuthStack/on-broading";
import { InputPassword } from "@/containers/unAuthStack/input-password";
import { BookingInforParent } from "@/containers/authStack/booking-infor-parent";
import { OutstandingTutor } from "@/containers/authStack/outstanding-tutor";
import { InforApplication } from "@/containers/authStack/infor-application";
import { Notification } from "@/containers/authStack/notification";
import { CreateResultLearning } from "@/containers/authStack/results-learning";
import { FeedBack } from "@/containers/authStack/feed-back";

const Stack = createNativeStackNavigator();

const AppStack = (isSignIn: boolean) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        isSignIn ? APP_SCREEN.LOGIN_SCREEN : APP_SCREEN.MAIN_TAB
      }
    >
      <Stack.Screen
        name={APP_SCREEN.ONBOARDING_SCREEN}
        component={OnBroading}
      />
      <Stack.Screen
        name={APP_SCREEN.REGISTER_INFOR_PARENT_SCREEN}
        component={RegisterInforParent}
      />
      <Stack.Screen
        name={APP_SCREEN.REGISTER_INFOR_TUTOR_SCREEN}
        component={RegisterInforTutor}
      />
      <Stack.Screen
        name={APP_SCREEN.INPUT_PASSWORD_SCREEN}
        component={InputPassword}
      />
      <Stack.Screen
        name={APP_SCREEN.CREATE_PASSWORD_SCREEN}
        component={CreatePassword}
      />
      <Stack.Screen
        name={APP_SCREEN.CONFIRM_PASSWORD_SCREEN}
        component={ConfirmPassword}
      />
      <Stack.Screen name={APP_SCREEN.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={APP_SCREEN.REGISTER_SCREEN}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={APP_SCREEN.INPUT_NUMBER_SCREEN}
        component={InputNumberScreen}
      />
      <Stack.Screen
        name={APP_SCREEN.VERIFY_NUMBER_SCREEN}
        component={VerifyOTPScreen}
      />
      <Stack.Screen
        name={APP_SCREEN.SELECT_ACCOUNT_TYPE_SCREEN}
        component={SelectAccountType}
      />
      <Stack.Screen name={APP_SCREEN.MAIN_TAB} component={MainTab} />
      <Stack.Screen name={APP_SCREEN.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen
        name={APP_SCREEN.CALENDA_SCREEN}
        component={CalendaScreen}
      />
      <Stack.Screen name={APP_SCREEN.RESULT_SCREEN} component={ResultScreen} />
      <Stack.Screen
        name={APP_SCREEN.PAYMENT_SCREEN}
        component={PaymentScreen}
      />
      <Stack.Screen
        name={APP_SCREEN.ACCOUNT_SCREEN}
        component={AccountScreen}
      />
      <Stack.Screen name={APP_SCREEN.SEARCH_SCREEN} component={SearchScreen} />
      <Stack.Screen
        name={APP_SCREEN.TUTOR_DETAIL_SCREEN}
        component={TutorDetailScreen}
      />
      <Stack.Screen name={APP_SCREEN.BOOKING_SCREEN} component={BookingInfor} />
      <Stack.Screen
        name={APP_SCREEN.PAYMENT_DETAIL_SCREEN}
        component={PaymentDetails}
      />
      <Stack.Screen
        name={APP_SCREEN.PAYMENT_GUIDE_SCREEN}
        component={PaymentGuide}
        options={{ presentation: "transparentModal" }}
      />
      <Stack.Screen
        name={APP_SCREEN.CALENDA_PARENT_DETAIL_SCREEN}
        component={CalendaParentDetailsScreen}
      />
      <Stack.Screen
        name={APP_SCREEN.BOOKING_INFOR_TUTOR_SCREEN}
        component={BookingInforTutor}
      />
      <Stack.Screen
        name={APP_SCREEN.BOOKING_INFOR_PARENT_SCREEN}
        component={BookingInforParent}
      />
      <Stack.Screen
        name={APP_SCREEN.RESULT_LATEST_SCREEN}
        component={ResultsLatest}
      />
      <Stack.Screen
        name={APP_SCREEN.LEARNING_OUTCOMES_SCREEN}
        component={LeaningOutcomes}
      />
      <Stack.Screen
        name={APP_SCREEN.TEACHING_SCREEN}
        component={TeachingClass}
      />
      <Stack.Screen
        name={APP_SCREEN.CLASS_DETAIL_SCREEN}
        component={ClassDetailsParent}
      />
      <Stack.Screen
        name={APP_SCREEN.HUSBAND_WIFE_ACCOUNT_SCREEN}
        component={HusbandWifeAccount}
      />
      <Stack.Screen
        name={APP_SCREEN.CHILDREN_ACCOUNT_SCREEN}
        component={ChildrenAccount}
      />
      <Stack.Screen
        name={APP_SCREEN.ADD_NEW_CALENDAR_SCREEN}
        component={AddNewCalendar}
      />
      <Stack.Screen
        name={APP_SCREEN.DETAIL_CALENDAR_TUTOR_SCREEN}
        component={DetailCalendarTutor}
      />
      <Stack.Screen
        name={APP_SCREEN.DETAIL_CALENDAR_PARENT_SCREEN}
        component={DetailCalendarParents}
      />
      <Stack.Screen
        name={APP_SCREEN.ACCOUNT_TUTOR_DETAILS_SCREEN}
        component={AccountTutorDetails}
      />
      <Stack.Screen
        name={APP_SCREEN.ACCOUNT_PARENT_DETAILS_SCREEN}
        component={AccountParentsDetails}
      />
      <Stack.Screen
        name={APP_SCREEN.OUTSTANDING_TUTOR_SCREEN}
        component={OutstandingTutor}
      />
      <Stack.Screen
        name={APP_SCREEN.NOTIFICATION_SCREEN}
        component={Notification}
      />
      <Stack.Screen
        name={APP_SCREEN.INFOR_APPLICATION_SCREEN}
        component={InforApplication}
      />
      <Stack.Screen
        name={APP_SCREEN.CREATE_RESULT_LEARNING}
        component={CreateResultLearning}
      />
      <Stack.Screen
        name={APP_SCREEN.FEED_BACK_SCREEN}
        component={FeedBack}
        options={{ presentation: "fullScreenModal" }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
