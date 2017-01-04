// const MediaObject = (src, text) => (
//   <section className="dt mw6 center ppv4 pv5-m pv6-ns">
//     <div className="dtc v-mid">
//       <img src={src} className="mw5" />
//     </div>
//     <p className="dtc v-mid pl3 lh-copy">{text}</p>
//   </section>
// )
//
// export default <div>
// <MediaObject src="finn.jpg" text="Finn the Human"/>
// <MediaObject src="jake.jpg" text="Jake the Dog"/>
// </div>
//
// import './MyComponent.css'
//
// export default () => (
//   <div className="MyComponent">
//     <div className="MyComponent__Icon">Icon</div>
//     ...
//   </div>
// )
//
// import styles from './MyComponent.css'
//
// export default () => (
//   <div className={styles.outer}>
//     <div className={styles.icon}>Icon</div>
//     ...
//   </div>
// )
//
// const stylez = {
//   outer: {
//     paddingTop: '1rem',
//     marginLeft: '12px'
//   },
//   icon: {
//     maxWidth: '100%'
//   }
// }
//
// export default () => (
//   <div style={styles.outer}>
//     <div style={styles.icon}>Icon</div>
//     ...
//   </div>
// )
//
// /* components/submit-button.jsx */
// import styles from './submit-button.css';
//
// return <button className={styles.normal}>Submit</button>
//

<div>
<button class="SubmitButton--Normal">Submit</button>
<button class="SubmitButton--Danger">Delete!</button>
<button className={styles.normal}>Submit</button>
<button className={styles.danger}>Delete!</button>
</div>
