import { useCallback, useState } from "react";
import Constants from "../helpers/constants";
import Utilities from "../helpers/utilities";
import { User } from "../types/user";

export declare interface UserUpdateProfileResult {
    updateProfile: (twitterHandle: string, user: User) => Promise<void>,
    errorMessage: string | null,
    isLoading: boolean
}

export const useUpdateProfile = (): UserUpdateProfileResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const updateProfile = useCallback(async (twitterHandle: string, user: User): Promise<void> => {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            const { name, description } = user;
            const response = await Utilities.putData(`${Constants.API}/user/${twitterHandle}`, {
                name, description,
            });

            if(!response.success) {
                setErrorMessage('Error updating profile, try it againg');
            }
        } catch (error) {
            setErrorMessage((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { updateProfile, errorMessage, isLoading };
};