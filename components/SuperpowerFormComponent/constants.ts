import { ModalMode } from "../../config/Interfaces";

export const SuperpowerFormStrings = {
    submitBtnCTA: (mode: ModalMode) =>  `${mode == "ADD"? "Add" : "Update"} a superpower Now!`,
    submittingBtnCTA: (mode: ModalMode) =>  `${mode == "ADD"? "Adding" : "Updating"} a super power...`,
    success: "You have successfully added a new superpower🤓",
    errorSuperpowerName: "You need to enter name of a new superpower.",
}