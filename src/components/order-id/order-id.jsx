import { useEffect, useState } from "react"
import styles from "./order_id.module.css"
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getIngrediensCountWithIndexes } from "../../utils/utils"

export default function OrderId() {

  const { number } = useParams()
  const { ingrediences } = useSelector(state => state.ingrediencesData)

  const [order, setOrder] = useState(
    {
      data: {}, 
      error: false, 
    }
  )

  useEffect(() => {
    getOrder(number)
      .then(res => {
        setOrder({...order, data: res.orders[0]})})
  }, [])

  let ingredientList, orderPrice
  if(!isEmptyObj(order.data)) {
        ingredientList = order.data.ingredients.map(item => getIngredientById(ingrediences, item))
        orderPrice = ingredientList.reduce((sum, item) => {
          return sum + item.price
        }, 0)
  }

  const date = () => {
    const dateFromServer = order.data.createdAt
    return <FormattedDate date={new Date(dateFromServer)} className='text text_type_main-default text_color_inactive'/>
  }
  
  return (
    <section className={styles.section}>
      <p className={`${styles.orderNumber} text text_type_digits-default`}>
        {`#${order.data.number}`}
      </p>
      <p className={`${styles.orderTitle} text text_type_main-medium`}>
        {order.data.name}
      </p>
      <p className={`${styles.orderStatus} text text_type_main-default text_color_inactive`}>
        {order.data.status === 'done' ? 'Выполнен' : 'Готовится'}
      </p>
      <p className={`${styles.orderStructure} text text_type_main-medium`}>
        Состав:
      </p>
      <ul className={`${styles.ingredients} custom-scroll`}>
        {
          ingredientList
          &&
          ingredientList.map((item, index, array) => {
            const { count, indexes } = getIngrediensCountWithIndexes(item, array)
            if(count > 1 && index === indexes[0]) {
              return (
                <li className={styles.ingredient} key={index}>
                  <div className={styles.ingredientImage} style={{backgroundImage: `url(${item.image_mobile})`}}></div>
                  <p className={`${styles.ingredientTitle} text text_type_main-default`}>
                    {item.name}
                  </p>
                  <div className={styles.ingredientPrice}>
                    <p className="text text_type_digits-default">
                      {`${count}x${item.price}`}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              )
            }
            if(count > 1 && index !== indexes[0]) {
              return null
            }
            return (
              <li className={styles.ingredient} key={index}>
                <div className={styles.ingredientImage} style={{backgroundImage: `url(${item.image_mobile})`}}></div>
                <p className={`${styles.ingredientTitle} text text_type_main-default`}>
                {item.name}
                </p>
                <div className={styles.ingredientPrice}>
                  <p className="text text_type_digits-default">
                    {`${count}x${item.price}`}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            )
          })
        }
      </ul>
      <div className={styles.summary}>
        {date()}
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default">
            {orderPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  )
}