import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const CustomLoadingImage = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
  <AlertDialogContent className="bg-white focus:outline-none">
    <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle>
    <div className="flex flex-col items-center my-10 justify-center">
      <Image src={"/progress.gif"} alt="loading" width={100} height={100} />
      <h2 className="text-xl">Generating Your Image... Do not refresh</h2>
    </div>
  </AlertDialogContent>
</AlertDialog>

  );
};

export default CustomLoadingImage;
