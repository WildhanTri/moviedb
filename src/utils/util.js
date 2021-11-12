import React from "react";
import { useLocation } from "react-router-dom";

export function convertUtcDateToYYYYMMDDHHMM(utcDate) {
    var date = new Date(utcDate);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = (date.getDate() + 1) < 10 ? '0' + (date.getDate()) : (date.getDate());
    var hour = (date.getHours() + 1) < 10 ? '0' + (date.getHours()) : (date.getHours());
    var minute = (date.getMinutes() + 1) < 10 ? '0' + (date.getMinutes()) : (date.getMinutes());
    return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}

export function windowScrollToTop() {
    window.scrollTo(0, 0);
}

export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}