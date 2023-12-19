export interface Alert {
  heading: string;
  message: string;
  matIcon?: string;
  imagePath?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface AskingAlert {
  heading: string;
  message?: string;
  rightButton?: string;
  leftButton?: string;
  matIcon?: string;
  imagePath?: string;
  addForm?: boolean;
  formDetails?: any;
  backgroundColor?: string;
  textColor?: string;
  width?: string;
  leftBtnWidth?: string;
  rightBtnWidth?: string;
}
