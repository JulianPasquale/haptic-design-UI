import React, { FC } from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components'

const Container = styled.div`
  margin-top: 1%;
`;

const Home: FC = (): React.ReactElement => (
  <Container>
    <Typography variant='h3' gutterBottom style={{ textAlign: "center" }}>
      Instrucciones de uso
    </Typography>

    {/* Create vibration instructions */}
    <Typography variant='h5' gutterBottom>
      Crear vibraciones
    </Typography>
    <Typography paragraph>
      Para crear una vibración se debe hacer clic en el botón "Nueva vibración", ubicado en la parte superior del menú que se visualiza en la izquierda de la pantalla. Esto abrirá una ventana emergente o modal, que le solicitará una categoría y un nombre para su vibración.
      Luego de ser creada, la vibración podrá ser encontrada en la misma barra lateral dentro de una carpeta con el mismo nombre de la categoría ingresada. Si le hace clic a dicha vibración, será redirigido a una nueva pantalla donde podrá ver un gráfico que ilustra el efecto que esa vibración produce.
      La vibración será creada con una configuración inicial por defecto, que será graficada como una línea recta representando un efecto continuo con una duración de un segundo.
    </Typography>

    {/* Show vibration instructions */}
    <Typography variant='h5' gutterBottom>
      Mostrar vibración
    </Typography>
    <Typography paragraph>
      Luego de crear una vibración, o de personalizarla, necesitaremos visualizar la vibración con todos sus datos. Esto se hace ubicando la vibración deseada en el panel lateral izquierdo, dentro de la carpeta con el nombre de la categoría utilizada al momento de la creación.
      Cuando ubicamos nuestra vibración, solo basta con hacer clic sobre su nombre para que el sistema nos redirigirá a una nueva pantalla y podemos ver todos sus datos. Esta pantalla será la misma a la que debemos acceder con el fin de editar sus datos o cualquier de las funcionalidades que se describen a continuación.
    </Typography>

    {/* Edit vibration instructions */}
    <Typography variant='h5' gutterBottom>
      Personalizar vibración
    </Typography>
    <Typography paragraph>
      Una vez creada, la vibración puede ser personalizada en busca de un efecto distinto que se asemeje a la vibración esperada. El primer paso para poder modificarla es acceder a la pantalla de visualización y edición de vibraciones, como se describió previamente en "Mostrar vibración".
      Al hacer clic en un punto del gráfico se visualizará una ventana en la misma pantalla que permite cambiar el valor de dicho punto, así como también un botón que permite borrar completamente dicho valor del gráfico.
      A su vez, nuevos puntos pueden ser creados utilizando el botón "Agregar nuevo punto", ubicado en la parte inferior derecha de la pantalla. Al hacer clic sobre él se mostrará la misma ventana emergente, donde puede configurarse el valor que se espera que tome dicho punto en el gráfico.
    </Typography>

    {/* Delete vibration instructions */}
    <Typography variant='h5' gutterBottom>
      Borrar vibración
    </Typography>
    <Typography paragraph>
      Primero debemos acceder a la pantalla de visualización de la vibración que deseamos eliminar y allí se podrá visualizar toda su información junto con un botón rojo con el texto "Borrar vibración", ubicado en la parte superior derecha de la pantalla. Al hacer clic en dicho botón, la vibración será borrada y ya no podrá visualizarse en la barra lateral.
    </Typography>

    {/* Copy link for share vibration */}
    <Typography variant='h5' gutterBottom>
      Copiar link a vibración
    </Typography>
    <Typography paragraph>
      Si lo que queremos es compartir la versión ejecutable de la vibración: Al acceder a la pantalla de visualización de una vibración, podremos ver que hay un botón para copiar un enlace, ubicado en el costado superior izquierdo de dicha pantalla. Al hacer clic en este botón, un enlace será copiado a nuestro portapapeles listo para ser pegado y compartido.
      Si lo que queremos es compartir en enlace para visualizar los datos de la vibración: Para esto basta con copiar la URL del navegador una vez que hayamos accedido a la pantalla de edición de vibraciones. Con dicho enlace, cualquier persona puede acceder y ver o modificar la misma vibración.
    </Typography>
  </Container>
);

export default Home;
