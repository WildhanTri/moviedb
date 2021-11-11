import axios from "axios";
import React from "react";


export default class MovieService extends React.Component {

    getMovies = (query, type, y, page) => {
        return new Promise((resolve, reject) => {
            var url = process.env.REACT_APP_OMDBAPI_API_ENDPOINT + "?apikey=" + process.env.REACT_APP_OMDBAPI_API_TOKEN + "&s=" + query;

            if (type != null) {
                url += "&type=" + type;
            }
            if (y != null) {
                url += "&y=" + y;
            }
            if (page != null) {
                url += "&page=" + page;
            }

            axios.get(url, {})
                .then(
                    (response) => {
                        resolve(response.data)
                    }
                ).catch(
                    (error) => {
                        reject(error)
                    }
                )
        })
    }
}