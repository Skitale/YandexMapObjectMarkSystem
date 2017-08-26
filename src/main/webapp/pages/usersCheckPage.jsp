<%@ taglib prefix="spring" uri="http://www.springframework.org/tags/form" %>
<%--
  Created by IntelliJ IDEA.
  User: TrueNess
  Date: 25.07.2017
  Time: 23:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<spring:form modelAttribute="UserFromServer" method="post" action="./check">
    <spring:input path="name"/>
    <spring:input path="password"/>
    <spring:button>To check</spring:button>
</spring:form>
</body>
</html>
