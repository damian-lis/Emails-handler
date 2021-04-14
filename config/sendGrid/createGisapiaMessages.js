const createGisapiaMessages = ({ type, data }) => {
  let message
  const space = (value) => `<div style="height:${value}px"></div>`
  const strong = (value) => `<strong>${value}</strong>`
  const p = (value) => `<p>${value}</p>`

  switch (type) {
    case 'mail':
      const { senderName, recipientMail, name, origin, hobby } = data
      let senderMail
      if (senderName === 'Gisapia') {
        senderMail = senderName + 'JS@gmail.com'
      } else {
        senderMail = senderName + 'JSX@gmail.com'
      }
      message = {
        to: recipientMail,
        from: senderMail,
        subject: 'Patrz co udało mi się zapamiętać!',
        html: `
          ${p(`Hej ${name}, tutaj ${senderName}!`)}
          ${space(5)}
          ${p(
            `Zgodnie z obietnicą przesyłam informacje jakie udało mi się zapamiętać. 😉`
          )}
          ${p(`Więc tak, masz na imię ${strong(name)},`)}
          ${p(`Twoja miejscowość zamieszkania to ${strong(origin)},`)}
          ${p(`hobby jakie uprawiasz w wolnym czasie to ${strong(hobby)},`)}
         ${p(
           `Chyba dobrze się spisał${
             senderName === 'Gisapia' ? 'am' : 'em'
           } co nie? 😃`
         )}
          ${space(5)}
          ${p(
            `Dzięki wielkie za rozmowę, dobrze się bawił${
              senderName === 'Gisapia' ? 'am' : 'em'
            }! 😎`
          )}
          ${p(`Mam nadzieję, że Ty również 😋!`)}
          `,
      }
      break

    case 'success':
      message = [`Mail wysłany!`, `sprawdź! 😋`]

      break

    case 'error':
      message = [
        `Mail niestety nie został wysłany...`,
        `Jakiś problem z serwerem... 😓`,
        `Idę to sprawdzić...`,
        `Tymczasem dzięki za rozmowę! 😉`,
      ]

      break

    default:
      break
  }

  return message
}

module.exports = createGisapiaMessages
