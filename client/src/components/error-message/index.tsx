import { useEffect } from "react";
import Swal from "sweetalert2";

//^ custom stylesheet
import styles from "../SwalWithCustomButtons.module.css";

enum ErrorAlertTypes {
  error = "error",
  success = "success",
  question = "question",
  warning = "warning",
  info = "info",
}

export type ErrorAlertProps = {
  title: string;
  subTitle: string;
  status?: keyof typeof ErrorAlertTypes;
  clg?: string | number | object | Array<any> | any;
  onConformed?: Function;
};

export default function ErrorAlert({
  title,
  subTitle,
  status,
  clg,
  onConformed,
}: ErrorAlertProps) {
  useEffect(() => {
    const swalWithCustomButtons = Swal.mixin({
      customClass: {
        confirmButton: `${styles.btn} ${styles["success-btn"]}`,
        cancelButton: `${styles.btn} ${styles["danger-btn"]}`,
      },
      buttonsStyling: false,
    });

    swalWithCustomButtons
      .fire(title, subTitle, status || "error")
      .then((result) => {
        if (result.isConfirmed) {
          onConformed && onConformed();
        }
      });

    if (clg) {
      console.log(clg);
    }
    //eslint-disable-next-line
  }, [title, subTitle, status]);

  return null;
}
