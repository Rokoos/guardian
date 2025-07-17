import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

const TermsConditions = () => {
  const { setModalType, setShowModal } = useContext(ModalContext);
  return (
    <div className="flex flex-col p-2 items-center h-[60vh] overflow-y-scroll">
      <h4 className="flex self-start my-2 text-gray-700">
        Website Terms and Conditions
      </h4>
      <p className="text-sm text-gray-500">
        Please read these terms and conditions carefully before using{" "}
        <span className="font-bold ">WarsawNanny</span> service .
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">Conditions of use</h5>
      <p className="text-sm text-gray-500">
        By using this website, you certify that you have read and reviewed this
        Agreement and that you agree to comply with its terms. If you do not
        want to be bound by the terms of this Agreement, you are advised to stop
        using the website accordingly.{" "}
        <span className="font-bold ">WarsawNanny</span> grants use and access of
        this website, and its services to those who have accepted its terms.
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">Privacy policy</h5>
      <p className="text-sm text-gray-500">
        Before you continue using our website, we advise you to read our privacy
        policy [link to privacy policy] regarding our user data collection. It
        will help you better understand our practices.
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">Age restriction</h5>
      <p className="text-sm text-gray-500">
        You must be at least 18 (eighteen) years of age before you can use this
        website. By using this website, you warrant that you are at least 18
        years of age and you may legally adhere to this Agreement.{" "}
        <span className="font-bold ">WarsawNanny</span> assumes no
        responsibility for liabilities related to age misrepresentation.
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">
        Intellectual property
      </h5>
      <p className="text-sm text-gray-500">
        You agree that all materials and services provided on this website are
        the property of <span className="font-bold ">WarsawNanny</span>, its
        affiliates, directors, officers, employees, agents, suppliers, or
        licensors including all copyrights, trade secrets, trademarks, patents,
        and other intellectual property. You also agree that you will not
        reproduce or redistribute the{" "}
        <span className="font-bold ">WarsawNanny</span>’s intellectual property
        in any way, including electronic, digital, or new trademark
        registrations. You grant <span className="font-bold ">WarsawNanny</span>{" "}
        a royalty-free and non-exclusive license to display, use, copy,
        transmit, and broadcast the content you upload and publish. For issues
        regarding intellectual property claims, you should contact the company
        in order to come to an agreement.
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">User accounts</h5>
      <p className="text-sm text-gray-500">
        As a user of this website, you may be asked to register with us and
        provide private information. You are responsible for ensuring the
        accuracy of this information, and you are responsible for maintaining
        the safety and security of your identifying information. You are also
        responsible for all activities that occur under your account or
        password. If you think there are any possible issues regarding the
        security of your account on the website, inform us immediately so we may
        address them accordingly. We reserve all rights to terminate accounts,
        edit or remove content at our sole discretion.
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">Applicable law</h5>
      <p className="text-sm text-gray-500">
        By using this website, you agree that the laws of the Poland, without
        regard to principles of conflict laws, will govern these terms and
        conditions, or any dispute of any sort that might come between{" "}
        <span className="font-bold ">WarsawNanny</span> and you, or its business
        partners and associates.
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">Disputes</h5>
      <p className="text-sm text-gray-500">
        Any dispute related in any way to your use of this website shall be
        arbitrated by state or federal court Poland and you consent to exclusive
        jurisdiction and venue of such courts.
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">Indemnification</h5>
      <p className="text-sm text-gray-500">
        You agree to indemnify <span className="font-bold ">WarsawNanny</span>{" "}
        and its affiliates and hold{" "}
        <span className="font-bold ">WarsawNanny</span> harmless against legal
        claims and demands that may arise from your use or misuse of our
        services. We reserve the right to select our own legal counsel.{" "}
      </p>
      <h5 className="flex self-start mt-2 text-gray-700">
        Limitation on liability
      </h5>
      <p className="text-sm text-gray-500">
        {" "}
        <span className="font-bold ">WarsawNanny</span> is not liable for any
        damages that may occur to you as a result of your misuse of our website.{" "}
        <span className="font-bold ">WarsawNanny</span> reserves the right to
        edit, modify, and change this Agreement at any time. We shall let our
        users know of these changes through electronic mail. This Agreement is
        an understanding between <span className="font-bold ">WarsawNanny</span>{" "}
        and the user, and this supersedes and replaces all prior agreements
        regarding the use of this website.
      </p>
      <button
        className="p-2 my-4 rounded-lg bg-gray-400 w-[5rem] text-white text-sm"
        onClick={() => {
          setModalType("");
          setShowModal(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

export default TermsConditions;
