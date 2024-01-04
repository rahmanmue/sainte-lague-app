import axiosInstance from "../networks/apis";

class ApiServices {
  static baseAPI = `${import.meta.env.VITE_API_URL}`;
  static baseUrl(endpoint) {
    return `${this.baseAPI + endpoint}`;
  }

  static async register(postData) {
    try {
      const response = await axiosInstance.post(
        this.baseUrl("/users"),
        postData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async login(postData) {
    try {
      const response = await axiosInstance.post(
        this.baseUrl("/login"),
        postData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUsers(user_id) {
    try {
      const response = await axiosInstance.get(
        this.baseUrl(`/users/${user_id}`)
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getUsersById(id) {
    try {
      const response = await axiosInstance.get(
        this.baseUrl(`/detail-user/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw Error;
    }
  }

  static async updateUserById(id, postData) {
    try {
      const response = await axiosInstance.put(
        this.baseUrl(`/users/${id}`),
        postData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteUserById(id) {
    try {
      const response = await axiosInstance.delete(this.baseUrl(`/users/${id}`));
      return response.data;
    } catch (error) {
      console.error;
      throw error;
    }
  }

  static async getAllDapil(user_id) {
    try {
      const response = await axiosInstance.get(
        this.baseUrl(`/dapil/${user_id}`)
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getDapilById(id) {
    try {
      const response = await axiosInstance.get(
        this.baseUrl(`/detail-dapil/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw Error;
    }
  }

  static async createDapil(postData) {
    try {
      const response = await axiosInstance.post(
        this.baseUrl(`/dapil`),
        postData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateDapilById(id, postData) {
    try {
      const response = await axiosInstance.put(
        this.baseUrl(`/dapil/${id}`),
        postData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteDapilById(id) {
    try {
      const response = await axiosInstance.delete(this.baseUrl(`/dapil/${id}`));
      return response.data;
    } catch (error) {
      console.error;
      throw error;
    }
  }

  static async getParpolByDapil(id) {
    try {
      const response = await axiosInstance.get(
        this.baseUrl(`/parpol/dapil/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error;
      throw error;
    }
  }

  static async getSuaraParpolById(id) {
    try {
      const response = await axiosInstance.get(
        this.baseUrl(`/parpol/suara/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error;
      throw error;
    }
  }

  static async createBulkSuaraParpol(postData) {
    try {
      const response = await axiosInstance.post(
        this.baseUrl("/parpol"),
        postData
      );
      return response.data;
    } catch (error) {
      console.error;
      throw error;
    }
  }

  static async updateSuaraParpolById(id, postData) {
    try {
      const response = await axiosInstance.put(
        this.baseUrl(`/parpol/suara/${id}`),
        postData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteSuaraParpolById(id) {
    try {
      const response = await axiosInstance.delete(
        this.baseUrl(`/parpol/suara/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error;
      throw error;
    }
  }
}

export default ApiServices;
