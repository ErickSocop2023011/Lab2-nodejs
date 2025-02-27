# API del Sistema de Adopción

Esta API está diseñada para gestionar citas para adopciones de mascotas. Incluye funcionalidades para crear, actualizar y listar citas, así como gestionar la información del usuario.

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
URI_MONGO=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
SECRETORPRIVATEKEY=<tu_secreto_jwt>
```

## Endpoints de la API

### Autenticación

- **Registrar Usuario**
  - **URL:** `/adoptionSystem/v1/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "surname": "string",
      "username": "string",
      "email": "string",
      "phone": "string",
      "password": "string",
      "role": "string",
      "profilePicture": "file"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `/adoptionSystem/v1/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### Usuarios

- **Obtener Usuario por ID**
  - **URL:** `/adoptionSystem/v1/user/findUser/:uid`
  - **Método:** `GET`

- **Eliminar Usuario**
  - **URL:** `/adoptionSystem/v1/user/deleteUser/:uid`
  - **Método:** `DELETE`

- **Listar Usuarios**
  - **URL:** `/adoptionSystem/v1/user/`
  - **Método:** `GET`

- **Listar Citas del Usuario**
  - **URL:** `/adoptionSystem/v1/user/findAppByUser/:uid`
  - **Método:** `GET`


- **Actualizar Contraseña del Usuario**
  - **URL:** `/adoptionSystem/v1/user/updatePassword/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    {
      "newPassword": "string"
    }
    ```

- **Actualizar Información del Usuario**
  - **URL:** `/adoptionSystem/v1/user/updateUser/:uid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "surname": "string"
    }
    ```

- **Actualizar Foto del Usuario**
  - **URL:** `/adoptionSystem/v1/user/updateProfPic/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```form-data
    {
      "profilePicture": "string"
    }
    ```

### Mascotas

- **Registrar Mascota**
  - **URL:** `/adoptionSystem/v1/pet/addPet`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "description": "string",
      "age": "number",
      "type": "string",
      "email": "string"
    }
    ```

- **Obtener Mascota por ID**
  - **URL:** `/adoptionSystem/v1/pet/findPet/:pid`
  - **Método:** `GET`

- **Eliminar Mascota**
  - **URL:** `/adoptionSystem/v1/pet/deletePet/:pid`
  - **Método:** `DELETE`

- **Listar Mascotas**
  - **URL:** `/adoptionSystem/v1/pet/`
  - **Método:** `GET`

### Citas

- **Crear Cita**
  - **URL:** `/adoptionSystem/v1/appointment/createAppointment`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "date": "2023-10-15T10:00:00Z",
      "pet": "string",
      "user": "string"
    }
    ```
- **Actualizar Cita**
  - **URL:** `/adoptionSystem/v1/appointment/updateAppointment/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    {
      "newDate": "2023-10-15T10:00:00Z",
    }
    ```

- **Cancelar Cita**
  - **URL:** `/adoptionSystem/v1/appointment/cancelApp/:uid`
  - **Método:** `DELETE`
