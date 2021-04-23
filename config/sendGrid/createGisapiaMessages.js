const createGisapiaMessages = ({ type, data }) => {
  let message
  const space = (value) => `<div style="height:${value}px"></div>`
  const strong = (value) => `<strong>${value}</strong>`
  const p = (value) => `<p>${value}</p>`

  switch (type) {
    case 'mail':
      const { language, senderName, recipientMail, name, origin, hobby } = data

      let senderMail
      if (senderName === 'Gisapia') {
        senderMail = senderName + 'JS@gmail.com'
      } else {
        senderMail = senderName + 'JSX@gmail.com'
      }
      message =
        language === 'pl'
          ? {
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
          : {
              to: recipientMail,
              from: senderMail,
              subject: 'Look what I was able to remember!',
              html: `
                ${p(`Hey ${name}, this is ${senderName}!`)}
                ${space(5)}
                ${p(
                  ` As promised, I am sending information that I can remember. 😉`
                )}
                ${p(`So yeah, your name is ${strong(name)},`)}
                ${p(`Your city of residence is ${strong(origin)},`)}
                ${p(`the hobby you do in your spare time is ${strong(hobby)},`)}
                ${p(`I think he did well which did not? 😃`)}
                ${space(5)}
                ${p(`Thanks so much for the interview, had a good time 😎`)}
                ${p(`I hope you too 😋!`)}
                `,
            }
      break

    case 'success':
      message = {
        pl: [`Mail wysłany!`, `sprawdź! 😋`],
        eng: [`Mail sent!`, `Check it! 😋`],
      }

      break

    case 'error':
      message = {
        pl: [
          `Mail niestety nie został wysłany...`,
          `Jakiś problem z serwerem... 😓`,
          `Idę to sprawdzić...`,
          `Tymczasem dzięki za rozmowę! 😉`,
        ],
        eng: [
          ` Mail was unfortunately not sent ... `,
          `Some problem with the server ... 😓`,
          ` I'm going to check it out ... `,
          ` In the meantime, thanks for the interview! 😉`,
        ],
      }

      break

    default:
      break
  }

  return message
}

module.exports = createGisapiaMessages
